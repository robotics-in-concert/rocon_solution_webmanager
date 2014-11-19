cmake_minimum_required(VERSION 2.8.3)
project(dummy_furo)

find_package(catkin REQUIRED COMPONENTS
  rospy
  std_msgs
  rospy_message_converter
  message_generation
  message_runtime
)

catkin_python_setup()

add_message_files(
   FILES
   HeadYaw.msg
 )

## Generate added messages and services with any dependencies listed here
generate_messages(
  DEPENDENCIES
  std_msgs
)

catkin_package()
