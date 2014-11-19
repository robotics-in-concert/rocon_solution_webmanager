#!/usr/bin/env python
#
# License: BSD

import rospy
import dummy_furo

if __name__ == '__main__':
    rospy.init_node('dummy_furo')
    furo = dummy_furo.FuroClient()
    furo.loginfo('Initialised')
    furo.spin()
    furo.loginfo('Bye Bye')
