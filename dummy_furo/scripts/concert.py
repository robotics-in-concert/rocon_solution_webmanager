#!/usr/bin/env python
#
# License: BSD
#   https://raw.github.com/robotics-in-concert/rocon_multimaster/license/LICENSE
#

import rospy
import dummy_furo

if __name__ == '__main__':
    rospy.init_node('dummy_furo')
    
    concert = dummy_furo.DummyFuro()

    concert.loginfo('Initialised')
    concert.spin()
    concert.loginfo('Bye Bye')
