#!/usr/bin/env python
#
# License: BSD
#   https://raw.github.com/robotics-in-concert/rocon_multimaster/license/LICENSE
#

import concert_msgs.srv as concert_srvs
import concert_msgs.msg as concert_msgs
import std_msgs.msg as std_msgs
import rospy

class DummyConcert(object):

    SERVICE_ENABLE_SRV_NAME = '/concert/service/enable'
    SERVICE_LIST_TOPIC_NAME = '/concert/service/list'

    def __init__(self):
        
        self.load_dummy_services()
        self.init_rosapis()

    def init_services(self):
        self.srv = {}
        self.srv['service_enable'] = rospy.Service(self.SERVICE_ENABLE_SRV_NAME, concert_srvs.EnableService, self.processEnableService)

        self.pub = {}
        self.pub['service_list'] = rospy.Publisher(self.SERVICE_LIST_TOPIC_NAME, concert_msgs.Services, latch=True)
        self.pub['


    def spin(self):
        rospy.spin()

    def loginfo(self, msg):
        rospy.loginfo('Dummy Concert : ' )
