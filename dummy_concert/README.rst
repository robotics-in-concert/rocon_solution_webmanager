Dummy Concert
=============

Prerequisite
----------

.. code-block::

    > sudo apt-get install ros-hydro-rocon
    > sudo apt-get install ros-hydro-rosbridge-suite
    > sudo apt-get install ros-hydro-unique-identifier 
    > sudo apt-get install ros-hydro-rospy-message-converter


Source Rosinstall file
-------------

https://raw.githubusercontent.com/robotics-in-concert/rocon_solution_webmanager/dummy/dummy_concert/dummy_concert.rosinstall 


How to start
------------

.. code-block::

     roslaunch dummy_concert dummy_concert.launch


This provides the following topics and service

**Topics**

* /concert/service/list
* /concert/gateway/dotgraph
* /concert/conductor/concert_clients_dotgraph


**Srvs**

* /concert/service/enable
