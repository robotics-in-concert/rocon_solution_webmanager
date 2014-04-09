cmake_minimum_required(VERSION 2.8.3)
project(dummy_concert)

find_package(catkin REQUIRED rospy std_msgs concert_msgs)

catkin_python_setup()

catkin_package(
  )
