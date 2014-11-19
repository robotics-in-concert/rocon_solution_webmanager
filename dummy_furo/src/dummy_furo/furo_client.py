#!/usr/bin/env python
#
# License: BSD
#

import yaml
import genpy
import serial
import math
import threading

import rospy
import concert_msgs.srv as concert_srvs
import concert_msgs.msg as concert_msgs
import std_msgs.msg as std_msgs
import geometry_msgs.msg as geometry_msgs

from rospy_message_converter import message_converter
from .msg import HeadYaw as FuroHeadYaw

class FuroClient(object):

    def __init__(self):
        self._running = False
        self.init_rosapis()
        self.init_rosparams()

    def init_rosapis(self):
        '''
            setup ros handles
        '''
        self.pub = {}
        self.pub['on_user_approached'] = rospy.Publisher('on_user_approached', std_msgs.Bool, queue_size = 3)

        self.subs = {}
        self.subs['play_speech'] = rospy.Subscriber('play_speech', std_msgs.String, self.PlaySpeech)
        self.subs['stop_speech'] = rospy.Subscriber('stop_speech', std_msgs.Empty, self.StopSpeech)
        self.subs['set_head_yaw'] = rospy.Subscriber('set_head_yaw', FuroHeadYaw, self.SetHeadYaw)
        self.subs['init_pose'] = rospy.Subscriber('init_pose', std_msgs.Empty, self.InitPose)
        self.subs['drive_wheel'] = rospy.Subscriber('cmd_vel', geometry_msgs.Twist, self.DriveWheel)
        self.subs['stop_wheel'] = rospy.Subscriber('stop_wheel', std_msgs.Empty, self.StopWheel)
        
    def init_rosparams(self):
        self._is_sim = rospy.get_param('~simulation', False)

    def init_serial(self):
        '''
            set up serial communication to Furo
        '''
        if not self._is_sim:
            self._serial = serial.Serial('/dev/ttyS0', 115200)
            self._serial.close()
            self._serial.open()
            self.loginfo('Serial Opened.')
        else:
            self.loginfo('Simulation Mode. Assume serial is openned')
        self._running = True

    def close_serial(self):
        if not self._is_sim:
            self._serial.close()
            self.loginfo('Serial Closed.')
            self._running = False
        else:
            self.loginfo('Simulation Mode. Assume serial is closed')

    def PlaySpeech(self, param):
        self.loginfo('PlaySpeech('+param.data+')')

    def StopSpeech(self, param):
        self.loginfo('StopSpeech()')

    def InitPose(self, param):
        self.loginfo('InitPose()')

    def SetHeadYaw(self, param):
        self.loginfo('SetHeadYaw('+str(param.pitch)+','+str(param.speed)+')')

    def DriveWheel(self, param):
        self.loginfo('DriveWheel('+str(param.linear.x)+','+str(param.angular.z)+')')
        if not self._is_sim:
            linear = param.linear.x
            angular = (param.angular.z) * math.pi / 180
            axleDistance = 0.3
            angular = angular * axleDistance / 2
            slope = 1.5
            gearRatio = 64
            wheelDiameter = 0.25
            leftVel = int(math.floor(slope * 60 * gearRatio * (linear - angular) / (math.pi * wheelDiameter)))
            rightVel = int(math.floor(slope * 60 * gearRatio * (linear + angular) / (math.pi * wheelDiameter)))
            self.DriveDifferential(-leftVel, 1000, rightVel, 1000)

    def DriveDifferential(self, left, leftTime, right, rightTime):
        arr = [0xFF,0xFF,0xFE,0x0E,0x06,0x20,0x04,0x2E,(left & 0xFF),(left >> 8 & 0xFF),(leftTime & 0xFF),(leftTime >> 8 & 0xFF),0x2F,(right & 0xFF),(right >> 8 & 0xFF),(rightTime & 0xFF),(rightTime >> 8 & 0xFF)]
        self.loginfo('arr : ' + self.array2string(arr))
        arr.append(self.CalcCheckSum(arr, len(arr)))
        self._serial.write(self.array2string(arr))

    def CalcCheckSum(self, arr, length):
        checkSum = 2
        for b in arr:
            checkSum += b
        return (~checkSum & 0xFF)

    def array2string(self, arr):
        return ''.join(chr(b) for b in arr)

    def StopWheel(self, param):
        self.loginfo('StopWheel()')

    def spin(self):
        self.init_serial()
        rospy.spin()
        self.close_serial()

    def loginfo(self, msg):
        rospy.loginfo('Furo Client : ' + str(msg))
