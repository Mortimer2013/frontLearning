/**
 * Created by wanghuailin on 2017/12/16.
 */
// 多行字符串
var multiLineStr = `
aaa
bbb
`;
// 字符串模版
var temp1 = "zs";
function func1() {
    return 18;
}
console.log(`my name is ${temp1}, i'm ${func1()}`);
// 字符串自动拆分
function func2(template,name,age){
    console.log(template);
    console.log(name);
    console.log(age);
}
func2 `hello, my name is ${name}, i'm ${func1()}`;



// 基本类型：5种
var name:string="chen"; //字符串类型
var age:number=18;  //数字类型
var isMan:boolean=true; //bool类型
var superStr:any=19;    //any类型
superStr = "change";
function test(name:string):void {  //void类型，只能应用于方法返回值
    console.log("test");
}
test("ceshi");



//参数的默认值
function test2(a:string,b:string,c:string="kaka") { //带默认值带参数必须声明在最后
    console.log(a);
    console.log(b);
    console.log(c);
}
test2("xxx","yyy");
//可选参数，可选参数必须在必选参数后，需要在方法中处理可选参数未传的情况
function test3(a:string,c:string="kaka",b?:string) {
    console.log(a);
    console.log(b);
    console.log(c);
}
test3("xxx");



//Rest and Spread操作符
//传入任意数量的参数
function test4(...args) {
    args.forEach(function(arg){
       console.log(arg);
    });
}
test4(1,2);
test4(7,8,9,10,11);
//将任意长度的数组转成对固定数量参数对调用
function test5(a,b,c) {
    console.log(a);
    console.log(b);
    console.log(c);
}
var arr1=[1,2];
var arr2=[7,8,9,10,11];
test5(...arr1); //打印结果为：1,2,undefined
test5(...arr2); //打印结果为：7,8,9



//generator函数可以暂停和继续函数的执行
//function* 为generator函数对声明
function* test6() {
    console.log("start");
    //暂停和继续函数的执行，无返回值时不用分号，有返回值时加上分号
    yield
    console.log("finished");
}
//需要被赋值给一个变量
var tt = new test6();
//通过变量调用方法的next()方法才能启动方法
tt.next();//停在yield关键字处
tt.next();//继续执行函数
//通过 yield 返回值并决定是否继续执行函数调用
function* getStockPrice() {
    while (true) {
        //返回一个0至100间的数字
        yield Math.random() * 100;
    }
}

var stock = new getStockPrice();
var limitPrice = 15;
var price = 100;
//直到股票价格小于limitPrice时停止循环
while (price > limitPrice) {
    price = stock.next().value;
    console.log(`stock price is ${price}`);
}
console.log(`buying at ${price}`);



//析构表达式
//获取对象中的变量
function test7() {
    return {
        code: "ibm",
        price: {
            price1: 200,
            price2:300
        },
        aaa:"haha"
    }
}
//{}中的名字必须和对象中的字段名字一致
//通过:为变量取别名
//取嵌套的对象中的变量值
var { aaa, code: x, price: { price1}} = test7();
console.log(price1);
console.log(x);
//获取数组中的值，将数组拆分
var arr1 = [1, 2, 3, 4, 5];
//nums为{4,5}
var [, num1, num2,...nums] = arr1;//2,3
console.log(num1);
console.log(num2);
console.log(nums);

//以析构表达式作为函数的参数
function test8([num1, num2, ...nums]) {
    console.log(num1);
    console.log(num2);
    console.log(nums);
}
test8(arr1);



//箭头表达式(匿名函数):消除传统javascript函数中this关键字指向不明问题
//如果函数体中代码只有一行，可以不写大括号和return关键字
var val = (arg1, arg2) => arg1 + arg2;
//无参数
var val1 = () => "无参数";
//只有一个参数
var val2 = arg => {
    console.log(arg);
}
console.log(val(1, 2));
console.log(val1());
val2("test");
var arr2=[2,2,3,4,5];
//获取数组中为偶数的值
console.log(arr2.filter(arg=>arg%2==0));
function test9(name: string) {
    this.name = name;
    setInterval(function () {
        console.log("name is " + this.name);
    },1000);
}
//直接调用函数是获取函数执行的结果，属性被加到全局作用域或函数所属对象上
//加上new调用，返回函数的实例
var val3=new test9("ibm");



//for循环
//forEach循环
var arr = [1, 2, 3, 4, 5];
//typescript中数组无法定义属性，但是js里不会报错，只是测试用
//arr.desc = "five numbers";
//打印数组中所有的值，不能中断
arr.forEach(val => console.log(val));
//for in循环。打印数组中所有的key。在JavaScript中，所有对象和集合都是键值对
for (var n in arr) {
    console.log(n);
}
//for of循环。打印数组中所有的值，同时可以中断
for (var val of arr) {
    if (val > 2) break;
    console.log(val);
}



//类
class Person{
    age;//默认访问控制符为public
    //构造函数中可以直接在参数内声明类的成员，需要加上访问控制符
    constructor(public name: string) {
        console.log("haha");
    }
    setAge(age: number) {
        this.age = age;
    }
    eat() {
        //记得加上this.
        console.log(`${this.name} is ${this.age} years old`);
    }
}
//继承自Person类的所有属性和方法
class Employee extends Person{
    constructor(name: string, code: string) {
        console.log("xixi");
        //super关键字用法一：调用父类的构造函数
        //子类的构造函数中必须调用父类的构造函数
        super(name);
        super.setAge(19);
        this.code = code;
    }

    code: string;
    work() {
        //super关键字的用法二：调用父类的方法
        super.eat();
        console.log("i'm working");
    }
}

var e1 = new Employee("lixi", "1");
e1.work();

var p1 = new Person("zhangsan");
p1.age = 18;
p1.eat();



//范型。限制集合中存放数据的类型
var arr: Array<Person> = [];
arr[0] = new Person("kiki");
arr[1] = new Employee("cat", "2");



//接口
interface IPerson{
    name: string;
    age: number;
}
class P {
    //接口用法，限制方法的参数类型
    constructor(public config:IPerson) {

    }
}
var p = new P({
    name: "zhangsan",
    age:18
});



//typescript中的文件就是模块
//模块中通过export暴露属性，方法，类给外部使用
export function func11() {

}
//模块中通过import导入其它模块的属性，方法和类进行使用
//import {xxx} from "xx"



//类型定义文件（*.d.ts）
//类型定义文件用来帮助开发者在typescript中使用已有的JavaScript工具包，如jquery



















