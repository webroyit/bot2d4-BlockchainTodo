pragma solidity ^0.5.0;
contract TodoList {
    // State variables
    // public keyword create a function to access to this variable
    // uint is an unsigned integer that cannot be negative
    uint public taskCount = 0;

    // struct is a data structure
    struct Task {
        uint id;
        string content;
        bool completed;
    }

    // mapping is like an associative array or a hash
    // uint will refer to the id of the task
    mapping(uint => Task) public tasks;
    
    function createTask(string memory _content) public {
        taskCount ++;
        tasks[taskCount] = Task(taskCount, _content, false);
    }
}