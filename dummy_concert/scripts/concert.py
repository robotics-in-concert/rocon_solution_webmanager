#!/usr/bin/env python
#
# License: BSD
#   https://raw.github.com/robotics-in-concert/rocon_multimaster/license/LICENSE
#

import rospy
import dummy_concert

if __name__ == '__main__':
    rospy.init_node('dummy_concert')
    
    concert = dummy_concert.DummyConcert()

    concert.loginfo('Initialised')
    concert.spin()
    concert.loginfo('Bye Bye')
