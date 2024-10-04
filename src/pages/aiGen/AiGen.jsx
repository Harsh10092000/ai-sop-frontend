import React, { useState, useRef, useEffect } from "react";
import ReactMarkDown from "react-markdown";
import axios from "axios";
import Loader from "../../components/loader/Loader";

const Label = ({ label_val }) => {
  return <label className="input-field-label">{label_val}</label>;
};

const AiGen = () => {
  const [loader, setLoader] = useState(false);
  const [studentData, setStudentData] = useState({
    stu_universityCountry: "",
    stu_universityName: "",
    stu_courseName: "",
    stu_name: "",
    stu_birthDate: "",
    stu_address: "",
    stu_fatherName: "",
    stu_motherName: "",
    stu_fatherOccupation: "",
    stu_motherOccupation: "",
    stu_familyDetails: "",
    stu_academicDetails: "",
    stu_interests: "",
    stu_wordLimit: "3000"
  });

  const [promptMsg, setPromptMsg] = useState("genrate SOP 4000 words");
  const [sampleFormat, setSampleormat] = useState(`Sample : 

     Introduction
My name is Anirudh Singh, and I am writing to express my strong interest in pursuing the MBA in Marketing program at the University of London. My passion for understanding consumer behavior and developing strategic marketing initiatives has driven me to seek an advanced degree that will equip me with the skills and knowledge to excel in this dynamic field.
Academic Background
I recently graduated with a Bachelor of Business Administration (BBA) from the University of Calcutta, achieving a commendable score of 80%. My studies provided me with a solid foundation in business principles, marketing theory, and quantitative analysis. I particularly enjoyed courses in consumer behavior and brand management, where I developed a deep interest in understanding the psychological and social factors influencing consumer choices.
Professional Goals and Interests
My ultimate career aspiration is to become a successful marketing leader within a reputable organization. I envision myself crafting compelling marketing campaigns that not only drive brand awareness but also create lasting connections with target audiences. I am particularly interested in the burgeoning field of digital marketing, with its focus on social media engagement and data-driven analysis.
Beyond academics, I actively participate in public speaking events, honing my communication skills and fostering confidence in conveying ideas persuasively. When not engaged in academic pursuits, I enjoy playing online games, which has surprisingly helped me develop strategic thinking and problem-solving abilities. This combination of academic rigor, strategic thinking, and effective communication will make me a valuable asset to your program.
Why University of London?
The University of London's MBA in Marketing program particularly excites me due to its renowned faculty, global outlook, and emphasis on practical application. I am particularly impressed by [mention specific program features that resonate with you - professors, courses, specializations, etc.]. This program's focus on real-world case studies and industry exposure aligns perfectly with my desire to gain practical experience while building on my theoretical knowledge. Additionally, the program's diverse student body will provide me with the opportunity to learn from and collaborate with individuals from various backgrounds and cultures.
Looking Forward
I am confident that my academic background, passion for marketing, and strong work ethic will make me a successful student in your program. I am eager to contribute meaningfully to classroom discussions and engage in research projects that push me to my full potential. I am confident that the University of London's MBA program will provide me with the necessary skills and knowledge to launch a thriving career in the marketing industry.
Thank you for considering my application.
Sincerely,
Anirudh Singh .......... use this format`);

  const [studentDat1, setStudentData1] = useState({
    stu_universityCountry: "Canada",
    stu_universityName: "University of Toronto",
    stu_courseName: "Computer Science",
    stu_name: "John Doe",
    stu_birthDate: "01.01.2000",
    stu_address: "123 Maple Street, Toronto, ON",
    stu_fatherName: "Michael Doe",
    stu_motherName: "Sarah Doe",
    stu_fatherOccupation: "Engineer",
    stu_motherOccupation: "Teacher",
    stu_familyDetails: "One younger sister, Alice Doe.",
    stu_academicDetails: "Graduated from High School with Honors.",
    stu_interests: "Coding, Gaming, and Reading.",
     stu_wordLimit: ""
  });

  //   const [text, setText] = useState(`Please check the below sample!

  // Please mention University/Institute Name: University of London

  // Enter course name here: MBA in Marketing

  // Enter name of the student: Anirudh Singh

  // Write birthdate of the student in dd.mm.yyyy format: 21.10.1999

  // Write address of the student: 10/B AchintNagar, Bhowanipur, Kolkata 700025 West Bengal

  // Enter Father’s Name: Mayank Singh

  // Enter Mother’s Name: Mita Singh

  // Enter Father’s Occupation: Textile Business

  // Enter Mother’s Occupation: Housewife

  // Enter other family details like siblings or anything important except Father and Moth Details: Sister studying BBA

  // Enter Academic Details: BBA with 80% Marks from the University of Calcutta

  // Mention the interests of the students: Playing online games, public speaking

  // genrate SOP  `);
  const [res, setRes] = useState("");

  const targetRef = useRef(null);

  const scrollToTarget = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubmit = () => {
    setRes("");
    setLoader(true);
    axios
      .post("https://sopapi.propertyease.in/generate-sop", {
        input1: studentData,
        input2: sampleFormat,
        input3: promptMsg,
      })
      .then((res) => (setRes(res.data)) );
  };

  useEffect(() => {
    console.log(res.length)
    if(res !== "") {
      setLoader(false) , scrollToTarget()
    }
  } ,[res])
  //console.log("loader : " ,loader);
  //console.log(res);
  

  return (
    <div>
      {loader && <Loader />}
      {/* <input
        type="text"
        //onChange={(e) => setText(e.target.value)}
        //value={text}
      /> */}

      <div className="form-module ">
        <div className="form-header">
          <div className="main-heading">AI SOP Generator</div>
          <div className="main-content">
            
            Use the form below to provide your personal and academic details. Once completed, click "Submit" to generate your Statement of Purpose (SOP) based on the provided information. Ensure all fields are filled out accurately to receive the best results.
          </div>
          <div
            data-orientation="horizontal"
            role="none"
            class="horizontal-divider"
          ></div>
        </div>

        <div className="form-module-wrapper">
          

          <div className="two-fields">
            <div className="input-field-wrapper mar_right">
              <Label label_val=" University/Institute Name" />
              <input
                type="text"
                className="input-field"
                onChange={(e) => {
                  setStudentData({ ...studentData, stu_u: e.target.value });
                }}
              />
            </div>

            <div className="input-field-wrapper ">
              <Label label_val=" University Location" />
              <input
                type="text"
                className="input-field"
                onChange={(e) => {
                  setStudentData({
                    ...studentData,
                    stu_universityCountry: e.target.value,
                  });
                }}
              />
            </div>
          </div>


<div className="two-fields">

<div className="input-field-wrapper mar_right">
            <Label label_val="Studnet Name" />
            <input
              type="text"
              className="input-field"
              onChange={(e) => {
                setStudentData({ ...studentData, stu_name: e.target.value });
              }}
            />
          </div>
          <div className="input-field-wrapper">
            <Label label_val="Course Name" />
            <input
              type="text"
              className="input-field"
              onChange={(e) => {
                setStudentData({
                  ...studentData,
                  stu_courseName: e.target.value,
                });
              }}
            />
          </div>
</div>

          
<div className="two-fields">
          <div className="input-field-wrapper mar_right">
            <Label label_val="Father’s Name" />
            <input
              type="text"
              className="input-field"
              onChange={(e) => {
                setStudentData({
                  ...studentData,
                  stu_fatherName: e.target.value,
                });
              }}
            />
          </div>

          <div className="input-field-wrapper">
            <Label label_val="Mother’s Name" />
            <input
              type="text"
              className="input-field"
              onChange={(e) => {
                setStudentData({
                  ...studentData,
                  stu_motherName: e.target.value,
                });
              }}
            />
          </div>
          </div>


          <div className="two-fields">    
          <div className="input-field-wrapper mar_right">
            <Label label_val="Father’s Occupation" />
            <input
              type="text"
              className="input-field"
              onChange={(e) => {
                setStudentData({
                  ...studentData,
                  stu_fatherOccupation: e.target.value,
                });
              }}
            />
          </div>

          <div className="input-field-wrapper">
            <Label label_val="Mother’s Occupation" />
            <input
              type="text"
              className="input-field"
              onChange={(e) => {
                setStudentData({
                  ...studentData,
                  stu_motherOccupation: e.target.value,
                });
              }}
            />
          </div>

          </div>

          <div className="input-field-wrapper">
            <Label label_val="Other family member details" />
            <input
              type="text"
              className="input-field"
              onChange={(e) => {
                setStudentData({
                  ...studentData,
                  stu_familyDetails: e.target.value,
                });
              }}
            />
          </div>

          <div className="input-field-wrapper">
            <Label label_val="Academic Details" />
            <input
              type="text"
              className="input-field"
              onChange={(e) => {
                setStudentData({
                  ...studentData,
                  stu_academicDetails: e.target.value,
                });
              }}
            />
          </div>

          <div className="input-field-wrapper">
            <Label label_val="Mention interests of the students" />
            <input
              type="text"
              className="input-field"
              onChange={(e) => {
                setStudentData({
                  ...studentData,
                  stu_interests: e.target.value,
                });
              }}
            />
          </div>

          <div className="input-field-wrapper">
            <Label label_val="Student Address" />
            <input
              type="text"
              className="input-field"
              onChange={(e) => {
                setStudentData({ ...studentData, stu_address: e.target.value });
              }}
            />
          </div>

          <div className="two-fields">  
          <div className="input-field-wrapper mar_right">
            <Label label_val="Student Date of birth" />
            <input
              type="date"
              className="input-field"
              onChange={(e) => {
                setStudentData({
                  ...studentData,
                  stu_birthDate: e.target.value,
                });
              }}
            />
          </div>
          <div className="input-field-wrapper">
            <Label label_val="Word Limit" />
            <input
              type="text"
              className="input-field"
              value={studentData.stu_wordLimit}
              onChange={(e) => {
                setStudentData({ ...studentData, stu_wordLimit: e.target.value });
              }}
            />
          </div>

          </div>


          <div onClick={handleSubmit} className="btn sub_btn">Submit</div>

        </div>
      </div>
     

      <div ref={targetRef} className="res-text">
        <ReactMarkDown>{res.text}</ReactMarkDown>
      </div>
    </div>
  );
};

export default AiGen;
