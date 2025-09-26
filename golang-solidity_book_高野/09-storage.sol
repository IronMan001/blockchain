pragma solidity^0.6.1;

contract storage_demo {
  	//自定义结构
    struct User {
        string name;
        uint256 age;
    }
    User public adminUser;
  	//构造函数
    constructor() public {
        adminUser.name = "yekai";
        adminUser.age = 40;
    }

  	//值传递，adminUser的age不会被修改
    function setAge1(uint256 _age) public view {
      	//值传递，user是adminUser的一个拷贝
        User memory user = adminUser;
        user.age = _age;
    }


  	//引用传递，adminUser的age会被修改
    function setAge2(uint256 _age) public {
      	//引用传递，user就是adminUser
        User storage user = adminUser;
        user.age = _age;
    }
}