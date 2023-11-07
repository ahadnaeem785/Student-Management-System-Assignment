#! /usr/bin/env node
import figlet, { textSync } from "figlet";
import inquirer from "inquirer";
import chalk from "chalk";
figlet.textSync("SMS")
console.log(figlet.textSync("SMS"));


class SMS{
    static student_id:number=1000;
    static student_lists:Student[]=[]

    //function to add new students
    enrollstudents(name:string,balance:number){
        SMS.student_id+=1
        let std = new Student(name,SMS.student_id,balance)
        SMS.student_lists.push(std)
    }

    displayStudentInfo(id:number){
        // Display that student Id
        let std=this.findbyid(id)
        std?.displayStudentInfo()
    }

    displayAllStudentInfo(){
        for (let std of SMS.student_lists){
            std.displayStudentInfo()
        }
        // console.log(SMS.student_lists)
    }

    //display student balance
    viewbalance(id:number){
        let std=this.findbyid(id)
        console.log(`Name :${std?.name} Id:${std?.id} Current Balance:${std?.balance}`);
        
    }
    //find student by id
    findbyid(id:number){
        for(let std of SMS.student_lists){
            if(std.id==id){
                return std
            }
        }
        console.log("Student Not Found");  
        return null   
    }

    //Displaying student data by ID
    displayStudentById(id:number){
        let std=this.findbyid(id)
        std?.displayStudentInfo()
    }
    // show_courses(id:number){
    //     let std=this.findbyid(id)
    //     console.log(`Name :${std?.name} Id:${std?.id}`);
    //     console.log("Courses", std?.getcourselist());
    // }

    // pay tuition fee
    payTutionfee(id:number,fee:number){
        let std=this.findbyid(id)
        std?.payfees(fee)
        }
        

    // Adding new course for the student
    add_new_course(id:number, course:string){
        let std = this.findbyid(id)
        std?.enrollcourse(course)
    }
}


class Student{
    name:string=""
    id:number
    balance:number=0
    courses:string[]=[]

    constructor(name:string,id:number,balance:number){
        this.name=name;
        this.id=id
        this.balance=balance
    }
    //here we enrolling course
    enrollcourse(new_course:string){
        this.courses.push(new_course)
    }

    //pay fees
    payfees(fee:number){
        if(fee <= this.balance){
            this.balance = this.balance - fee
            console.log(chalk.green.bold.italic("Submitted Successfully"));   
        }else{
            console.log(chalk.red.bold("Insufficient Balance!"));
        }
    }
    // getcourselist(){
    //     return this.courses
    // }

    displayStudentInfo(){
        console.log("Name:", this.name);
        console.log("id:", this.id);
        console.log("Balance:", this.balance);
        console.log("Course:", this.courses)
        console.log("______________________");
        
    }
}
while(true){

    // Making the Management Sytem by default values
    let sms=new SMS()

    // Displaying options for action
    let select=await inquirer.prompt([{
        name:"options",
        type:"list",
        message:"Select Options: ",
        choices:["Add Students", "Display All Students", "View Balance","Find Student by ID","Show Courses","Pay Tution Fee","Add New Course"]
    }])

    const {options}=select 

    if(options=="Add Students"){
        let add=await inquirer.prompt([{
            name:"insertname",
            type:"string",
            message:"Enter Name: "
        },
        {
            name:"insertbalance",
            type:"number",
            message:"Enter balance :"
        }])
        const{insertbalance, insertname}=add
        sms.enrollstudents(insertname,insertbalance)                             
    }  
    else if(options == "Display All Students"){
        sms.displayAllStudentInfo()
    }
    else if(options=="View Balance"){
        let give=await inquirer.prompt([{
            name:"id",
            type:"number",
            message:"Enter Id: "
        }])     
        sms.viewbalance(give.id)       
    }else if(options=="Find Student by ID"){
        let put=await inquirer.prompt([{
            name:"id",
            type:"number",
            message:"Enter Id: "
        }])
        sms.displayStudentById(put.id)
    }else if(options=="Pay Tution Fee"){
        let put=await inquirer.prompt([{
            name:"id",
            type:"number",
            message:"Enter Id: "
        },
        {
            name:"fee",
            type:"number",
            message:"Enter Amount: "
        }])
        const{id,fee}=put
        sms.payTutionfee(id,fee)
    }
    else if(options=="Add New Course"){
        let put=await inquirer.prompt([{
            name:"id",
            type:"number",
            message:"Enter Id: "
        },
        {
            name:"course",
            type:"string",
            message:"Enter course name: "
        }])
        const {id, course} = put
        sms.add_new_course(id, course)
    }
}
// sms.enrollstudents("Ahad",2000,["blockchain"])
// let f=sms.findbyid(1001)
// console.log(f);








