#!/usr/bin/env python
#
# License: BSD
#   https://raw.github.com/robotics-in-concert/rocon_multimaster/license/LICENSE
#

import concert_msgs.srv as concert_srvs
import concert_msgs.msg as concert_msgs
import std_msgs.msg as std_msgs
import rospy
import yaml
import genpy
from rospy_message_converter import message_converter


import serial
import math
import threading

class DummyFuro(object):

    SERVICE_ENABLE_SRV_NAME = '/concert/service/enable'
    SERVICE_LIST_TOPIC_NAME = '/concert/service/list'
    FURO_SRV_NAME = '/concert/service/furo'

    DOT_GRAPH_CONDUCTOR = '/concert/conductor/concert_clients_dotgraph'
    DOT_GRAPH_GATEWAY   = '/concert/gateway/dotgraph'

    running = False

    def __init__(self):
        #self.init_serial()
        self.load_example_services()
        self.load_dotgraph()
        self.init_rosapis()

    def init_serial(self):
        self._serial = serial.Serial('/dev/ttyUSB0', 115200)
        self._serial.open();
        self.loginfo('Serial Opened.')

    def PlaySpeech(self, speechData):
        self.loginfo('PlaySpeech('+speechData+')')

    def StopSpeech(self):
        self.loginfo('StopSpeech()')

    def InitPose(self):
        self.loginfo('InitPose()')

    def SetHeadYaw(self, pitch, speed):
        self.loginfo('SetHeadYaw('+pitch+','+speed+')')

    def DriveWheel(self, linear, angular):
        self.loginfo('DriveWheel('+linear+','+angular+')')

    def StopWheel(self):
        self.loginfo('StopWheel()')

    def load_example_services(self):
        filename = rospy.get_param('~example_services')

        with open(filename) as f:
            profile = yaml.load(f)

        msg = message_converter.convert_dictionary_to_ros_message('concert_msgs/Services', profile)
        self.profile = profile
        self.services = msg

    def load_dotgraph(self):
        self.graph = {}

        self.graph['conductor_graph'] = self.load_file('conductor_graph')
        self.graph['gateway_graph'] = self.load_file('gateway_graph')

    def load_file(self, name):

        param_name = '~' + str(name)
        filename = rospy.get_param(param_name)
        with open(filename) as f:
            data = f.read()
        return data

    def init_rosapis(self):
        self.srv = {}
        self.srv['service_enable'] = rospy.Service(self.SERVICE_ENABLE_SRV_NAME, concert_srvs.EnableService, self.process_enable_service)
        self.srv['PlaySpeech'] = rospy.Service(FURO_SRV_NAME + '/PlaySpeech', FuroService.PlaySpeech, self.PlaySpeech)
        self.srv['StopSpeech'] = rospy.Service(FURO_SRV_NAME + '/StopSpeech', FuroService.StopSpeech, self.StopSpeech)
        self.srv['InitPose'] = rospy.Service(FURO_SRV_NAME + '/InitPose', FuroService.InitPose, self.InitPose)
        self.srv['SetHeadYaw'] = rospy.Service(FURO_SRV_NAME + '/SetHeadYaw', FuroService.SetHeadYaw, self.SetHea#!/usr/bin/env python
#
# License: BSD
#   https://raw.github.com/robotics-in-concert/rocon_multimaster/license/LICENSE
#

import concert_msgs.srv as concert_srvs
import concert_msgs.msg as concert_msgs
import std_msgs.msg as std_msgs
import rospy
import yaml
import genpy
from rospy_message_converter import message_converter

from .srv import *

import serial
import math
import threading

class DummyFuro(object):

    SERVICE_ENABLE_SRV_NAME = '/concert/service/enable'
    SERVICE_LIST_TOPIC_NAME = '/concert/service/list'
    FURO_SRV_NAME = '/concert/service/furo'

    DOT_GRAPH_CONDUCTOR = '/concert/conductor/concert_clients_dotgraph'
    DOT_GRAPH_GATEWAY   = '/concert/gateway/dotgraph'

    running = False

    def __init__(self):
        #self.init_serial()
        self.load_example_services()
        self.load_dotgraph()
        self.init_rosapis()

    def init_serial(self):
        self._serial = serial.Serial('/dev/ttyUSB0', 115200)
        self._serial.open();
        self.loginfo('Serial Opened.')

    def PlaySpeech(self, req):
        self.loginfo('PlaySpeech('+req.speechData+')')
        return PlaySpeechResponse()

    def StopSpeech(self):
        self.loginfo('StopSpeech()')
        return StopSpeechResponse()

    def InitPose(self):
        self.loginfo('InitPose()')
        return InitPoseResponse()

    def SetHeadYaw(self, req):
        self.loginfo('SetHeadYaw('+str(req.pitch)+','+str(req.speed)+')')
        return SetHeadYawResponse()

    def DriveWheel(self, req):
        self.loginfo('DriveWheel('+str(req.linear)+','+str(req.angular)+')')
        return DriveWheelResponse()

    def StopWheel(self):
        self.loginfo('StopWheel()')
        return StopWheelResponse()

    def load_example_services(self):
        filename = rospy.get_param('~example_services')

        with open(filename) as f:
            profile = yaml.load(f)

        msg = message_converter.convert_dictionary_to_ros_message('concert_msgs/Services', profile)
        self.profile = profile
        self.services = msg

    def load_dotgraph(self):
        self.graph = {}

        self.graph['conductor_graph'] = self.load_file('conductor_graph')
        self.graph['gateway_graph'] = self.load_file('gateway_graph')

    def load_file(self, name):

        param_name = '~' + str(name)
        filename = rospy.get_param(param_name)
        with open(filename) as f:
            data = f.read()
        return data

    def init_rosapis(self):
        self.srv = {}
        self.srv['service_enable'] = rospy.Service(self.SERVICE_ENABLE_SRV_NAME, concert_srvs.EnableService, self.process_enable_service)
        self.srv['PlaySpeech'] = rospy.Service(self.FURO_SRV_NAME + '/PlaySpeech', PlaySpeech, self.PlaySpeech)
        self.srv['StopSpeech'] = rospy.Service(self.FURO_SRV_NAME + '/StopSpeech', StopSpeech, self.StopSpeech)
        self.srv['InitPose'] = rospy.Service(self.FURO_SRV_NAME + '/InitPose', InitPose, self.InitPose)
        self.srv['SetHeadYaw'] = rospy.Service(self.FURO_SRV_NAME + '/SetHeadYaw', SetHeadYaw, self.SetHeadYaw)
        self.srv['DriveWheel'] = rospy.Service(self.FURO_SRV_NAME + '/DriveWheel', DriveWheel, self.DriveWheel)
        self.srv['StopWheel'] = rospy.Service(self.FURO_SRV_NAME + '/StopWheel', StopWheel, self.StopWheel)

        self.pub = {}
        self.pub['service_list'] = rospy.Publisher(self.SERVICE_LIST_TOPIC_NAME, concert_msgs.Services, latch=True)
        self.pub['conductor_graph'] = rospy.Publisher(self.DOT_GRAPH_CONDUCTOR, std_msgs.String, latch=True)
        self.pub['gateway_graph'] = rospy.Publisher(self.DOT_GRAPH_GATEWAY, std_msgs.String, latch=True)

    def process_enable_service(self, req):
        en = 'enabled' if req.enable else 'disabled'
        self.loginfo(str(req.name) + ' : ' + en)

        service_found = False
        for service in self.profile['services']:
            if req.name == service['name']:
                service['enabled'] = req.enable 
                service_found = True
        
        if service_found:
            msg = message_converter.convert_dictionary_to_ros_message('concert_msgs/Services', self.profile)
            self.services = msg
            self.pub['service_list'].publish(self.services)
            #self.running = req.enable
            #if self.running:
            #    threading.Thread(target=self.moving).start()
            return concert_srvs.EnableServiceResponse(True, '')
        else:
            return concert_srvs.EnableServiceResponse(False,'Service not found')
    def spin(self):
        self.pub['service_list'].publish(self.services)
        self.pub['conductor_graph'].publish(self.graph['conductor_graph'])
        self.pub['gateway_graph'].publish(self.graph['gateway_graph'])
        rospy.spin()
        self._serial.close()
        self.loginfo('Serial Closed.')

    def loginfo(self, msg):
        rospy.loginfo('Dummy Furo : ' + str(msg))
dYaw)
        self.srv['DriveWheel'] = rospy.Service(FURO_SRV_NAME + '/DriveWheel', FuroService.DriveWheel, self.DriveWheel)
        self.srv['StopWheel'] = rospy.Service(FURO_SRV_NAME + '/StopWheel', FuroService.StopWheel, self.StopWheel)

        self.pub = {}
        self.pub['service_list'] = rospy.Publisher(self.SERVICE_LIST_TOPIC_NAME, concert_msgs.Services, latch=True)
        self.pub['conductor_graph'] = rospy.Publisher(self.DOT_GRAPH_CONDUCTOR, std_msgs.String, latch=True)
        self.pub['gateway_graph'] = rospy.Publisher(self.DOT_GRAPH_GATEWAY, std_msgs.String, latch=True)

    def process_enable_service(self, req):
        en = 'enabled' if req.enable else 'disabled'
        self.loginfo(str(req.name) + ' : ' + en)

        service_found = False
        for service in self.profile['services']:
            if req.name == service['name']:
                service['enabled'] = req.enable 
                service_found = True
        
        if service_found:
            msg = message_converter.convert_dictionary_to_ros_message('concert_msgs/Services', self.profile)
            self.services = msg
            self.pub['service_list'].publish(self.services)
            #self.running = req.enable
            #if self.running:
            #    threading.Thread(target=self.moving).start()
            return concert_srvs.EnableServiceResponse(True, '')
        else:
            return concert_srvs.EnableServiceResponse(False,'Service not found')
    def spin(self):
        self.pub['service_list'].publish(self.services)
        self.pub['conductor_graph'].publish(self.graph['conductor_graph'])
        self.pub['gateway_graph'].publish(self.graph['gateway_graph'])
        rospy.spin()
        self._serial.close()
        self.loginfo('Serial Closed.')

    def loginfo(self, msg):
        rospy.loginfo('Dummy Concert : ' + str(msg))

