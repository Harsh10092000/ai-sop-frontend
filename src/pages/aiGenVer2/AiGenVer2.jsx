import React, { useState, useRef, useEffect } from "react";
import ReactMarkDown from "react-markdown";
import axios from "axios";
import Loader from "../../components/loader/Loader";
import { countryList } from "../../components/Countries";
const Label = ({ label_val }) => {
  return <label className="input-field-label">{label_val}</label>;
};

const NameField = ({
  value,
  studentData,
  stu_data_obj,
  placeholder,
  custom_css1,
  custom_css2,
  setStudentData,
}) => {
  return (
    <div className={`input-field-wrapper ${custom_css1}`}>
      {console.log("stu_data_obj , value : ", stu_data_obj, value)}

      <input
        type="text"
        className={`${custom_css2}`}
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          setStudentData({ ...studentData, [stu_data_obj]: e.target.value });
        }}
      />
    </div>
  );
};

const TextAreaField = ({
  value,
  studentData,
  stu_data_obj,
  placeholder,
  custom_css1,
  custom_css2,
  setStudentData,
}) => {
  return (
    <div className={`input-field-wrapper ${custom_css1}`}>
      <textarea
        type="text"
        rows="4"
        cols="50"
        className={`${custom_css2}`}
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          setStudentData({ ...studentData, [stu_data_obj]: e.target.value });
        }}
      ></textarea>
    </div>
  );
};

const CheckboxField = ({
  content,
  studentData,
  setStudentData,
  stu_data_obj_key,
  stu_data_obj,
}) => {
  return (
    <div class="form-check two-fields">
      <input
        class="form-check-input checkbox-field"
        type="checkbox"
        value=""
        id="flexCheckDefault"
        onChange={(e) => {
          setStudentData({
            ...studentData,
            [stu_data_obj]: stu_data_obj_key == true ? false : true,
          });
        }}
      />
      {content}
    </div>
  );
};

const sidebar = [
  { value: "Personal Information", id: "1" },
  { value: "Academic Background", id: "2" },
  { value: "Professional Experience", id: "3" },
  // { value: "Motivation and Goals", id: "4" }, //Added as checkbox in last poiint
  { value: "Extracurricular Activities and Interests", id: "5" },
  // { value: "Skills and Certifications", id: "6" }, //SKIPED
  { value: "Challenges and Overcoming Obstacles", id: "7" },
  { value: "Additional Information", id: "8" },
  { value: "Writing Style Preferences and Submission ", id: "9" },
];

const propertyAge = [
  { value: "0" },
  { value: "0-1" },
  { value: "1-3" },
  { value: "3-5" },
  { value: "5-10" },
  { value: "10+" },
];

const degrees = [
  { value: "High School Diploma" },
  { value: "Associate's Degree" },
  { value: "Bachelor's Degree" },
  { value: "Master's Degree" },
  { value: "Doctorate" },
  { value: "Professional Degree" },
  { value: "Other" },
];

const subjects = [
  { value: "Mathematics" },
  { value: "Science" },
  { value: "Literature" },
  { value: "History" },
  { value: "Art" },
  { value: "Computer Science" },
  { value: "Business" },
  { value: "Psychology" },
  { value: "Engineering" },
  { value: "Other" },
];

const tonePreference = [
  { value: "Formal" },
  { value: "Conversational" },
  { value: "Academic" },
];

const focusArea = [
  { value: "Academic Achievements" },
  { value: "Professional Experience" },
  { value: "Personal Motivation" },
];

const languagesSpoken = [
  { value: "Hindi" },
  { value: "English" },
  { value: "Spanish" },
  { value: "Mandarin" },
  { value: "French" },
  { value: "German" },
  { value: "Arabic" },
  { value: "Portuguese" },
  { value: "Russian" },
  // { value: "Other" },
];

const RadioBoxSelection = ({
  heading,
  array,
  value,
  stu_data_obj,
  studentData,
  setStudentData,
}) => {
  return (
    <div className="pro_flex pro_flex_1">
      <div className="w-100 m-1 mb-3">
        <span className="pro_heading">{heading}</span>
        <div className="radio_brn-mian ">
          {array.map((item) => (
            <div
              className={
                value === item.value
                  ? "pro_radio_btn_1 pro_selected"
                  : "pro_radio_btn_1"
              }
              onClick={() =>
                setStudentData({
                  ...studentData,
                  [stu_data_obj]: item.value,
                })
              }
            >
              {item.value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AiGenVer2 = () => {
  const [loader, setLoader] = useState(false);
  const [selectedOption, setSelectedOption] = useState("1");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedLang, setSelectedlang] = useState([]);
  const [addExperince, setAddExperince] = useState(0);
  const [selectedFoucsArea, setSelectedFoucsArea] = useState([]);

  const [studentData1, setStudentData1] = useState({
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
    stu_wordLimit: "3000",
  });

  const [promptMsg, setPromptMsg] = useState("genrate SOP ");
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
Anirudh Singh .......... use this format only , not this data`);

  const [studentData, setStudentData] = useState({
    // ############### step1 ###############
    stu_name: "John Doe",
    stu_city: "Kurukshetra",
    stu_phone: "9078563421",
    stu_country: "India",
    stu_degreeLevel: "Bachelor's",
    stu_interested_field: "Computer Science",
    stu_interested_specialization: "Artificial Intelligence",
    stu_universityName: "University of Toronto",
    // stu_name: "",
    // stu_city: "",
    // stu_phone: "",
    // stu_countrty: "",
    // stu_degreeLevel: "",
    // stu_interested_field: "",
    // stu_interested_specialization: "",
    // stu_universityName: "",

    stu_fatherName: "Rajesh Doe",
    stu_motherName: "Anita Doe",
    stu_fatherOccupation: "Engineer",
    stu_motherOccupation: "Teacher",
    stu_familyDetails: "One younger sister, Priya.",

    // stu_fatherName: "",
    // stu_motherName: "",
    // stu_fatherOccupation: "",
    // stu_motherOccupation: "",
    // stu_familyDetails: "",

    // ############### step2 ###############

    stu_academicDetails_un: "",
    stu_academicDetails_degree: "",
    stu_academicDetails_year: "2",
    stu_academicDetails_gpa: "",
    stu_academicDetails_subjects: "",
    stu_academicDetails_awards: "",
    stu_academicDetails_research_exp: "",

    // ############### step3 and 6 combined ###############
    stu_job_details: [],
    stu_internship_details: [],

    stu_professional_achievements: "",
    stu_skills_acquired: "",

    stu_technical_skills: "",
    stu_certifications: "",
    stu_languages_spoken: "",

    // ############### step4 ###############
    stu_why_choose_program: false,
    stu_short_term_goals: false,
    stu_long_term_goals: false,
    stu_why_this_uni: false,
    stu_research_interests: false,
    stu_prog_align_goals: false,
    stu_growth_development: false,

    // ############### step5 ###############
    stu_extracurricular_involvement: "",
    stu_leadership_roles: "",
    stu_community_service: "",
    stu_hobbies: "",

    // ############### step6 ###############

    // ############### step7 ###############
    stu_personal_challengese: "",
    stu_learning_from_mistakes: "",

    // ############### step8 ###############
    stu_additional_points_highlight: "",
    stu_special_Circumstances: "",

    // ############### step9 ###############
    stu_sop_tone_preference: "",
    stu_focus_areas: "",
    stu_wordLimit: "3000",
    stu_declaration: false,
    stu_consent: false,
  });

  const [studentData10, setStudentData10] = useState({
    stu_name: "John Doe",
    stu_city: "Kurukshetra",
    stu_phone: "9078563421",
    stu_country: "India",
    stu_degreeLevel: "Bachelor's",
    stu_interested_field: "Computer Science",
    stu_interested_specialization: "Artificial Intelligence",
    stu_universityName: "University of Toronto",
    stu_fatherName: "Rajesh Doe",
    stu_motherName: "Anita Doe",
    stu_fatherOccupation: "Engineer",
    stu_motherOccupation: "Teacher",
    stu_familyDetails: "One younger sister, Priya.",
    stu_academicDetails_un: "University of Kurukshetra",
    stu_academicDetails_degree: "Bachelor of Technology",
    stu_academicDetails_year: "2023",
    stu_academicDetails_gpa: "3.8",
    stu_academicDetails_subjects:
      "Data Structures, Algorithms, Machine Learning",
    stu_academicDetails_awards: "Dean's List, Best Project Award 2022",
    stu_academicDetails_research_exp:
      "Research Assistant in AI for two semesters.",
    stu_job_details: [
      {
        stu_company_name: "Tech Solutions",
        stu_job_title: "Software Intern",
        stu_job_duration: "3 months",
        stu_role_description:
          "Worked on developing web applications using React and Node.js.",
      },
    ],
    stu_internship_details: [
      {
        stu_in_company_name: "Innovatech",
        stu_in_job_title: "Data Science Intern",
        stu_in_job_duration: "6 months",
        stu_in_role_description:
          "Assisted in building predictive models using Python.",
      },
    ],
    stu_professional_achievements:
      "Successfully led a team project that won first place in a hackathon.",
    stu_skills_acquired: "Proficient in Java, Python, and SQL.",
    stu_technical_skills: "Web Development, Machine Learning, Data Analysis.",
    stu_certifications: "Certified in Python Programming from Coursera.",
    stu_languages_spoken: "English, Hindi.",
    stu_why_choose_program:
      "I am passionate about AI and believe this program will equip me with advanced skills.",
    stu_short_term_goals:
      "To enhance my programming skills and gain practical experience.",
    stu_long_term_goals: "To become a leading AI researcher.",
    stu_why_this_uni:
      "The University of Toronto is renowned for its research facilities and faculty in AI.",
    stu_research_interests: "Deep Learning, Natural Language Processing.",
    stu_prog_align_goals:
      "This program aligns perfectly with my career aspirations.",
    stu_growth_development:
      "I aim to grow as a professional and contribute to impactful projects.",
    stu_extracurricular_involvement:
      "Member of the coding club and volunteer for local NGOs.",
    stu_leadership_roles:
      "Led a team project in college to develop a mobile app.",
    stu_community_service:
      "Volunteered at a local orphanage teaching computer skills.",
    stu_hobbies: "Reading, coding, and playing chess.",
    stu_personal_challenges:
      "Overcame difficulties with public speaking through practice and workshops.",
    stu_learning_from_mistakes:
      "Learned to manage time better after missing a project deadline.",
    stu_additional_points_highlight:
      "Completed an online course on AI fundamentals.",
    stu_special_Circumstances: "N/A",
    stu_sop_tone_preference: "Formal and professional.",
    stu_focus_areas: "Artificial Intelligence, Data Science.",
    stu_wordLimit: "3000",
    stu_declaration: true,
    stu_consent: true,
  });

  const [res, setRes] = useState("");

  const targetRef = useRef(null);

  const scrollToTarget = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSubmit = () => {
    studentData.stu_focus_areas = selectedTypes?.map((item) => item).join(",");
    studentData.stu_languages_spoken = selectedLang
      ?.map((item) => item)
      .join(",");
    setRes("");
    studentData.stu_focus_areas = selectedFoucsArea
      ?.map((item) => item)
      .join(",");

    setLoader(true);
    axios
      .post("http://localhost:3000/generate-sop", {
      //.post("https://sopapi.propertyease.in/generate-sop", {
        input1: studentData,
        input2: sampleFormat,
        input3: promptMsg,
      })
      .then((res) => setRes(res.data));
  };

  useEffect(() => {
    // console.log(res.length);
    if (res !== "") {
      setLoader(false), scrollToTarget();
    }
  }, [res]);
  //console.log("loader : " ,loader);
  //console.log(res);

  const [copySuccess, setCopySuccess] = useState("");

  const handleCopy = () => {
    //console.log(data.props.children , data.props);
    //const textToCopy = "https://propertyease.in/";
    const textToCopy = targetRef.current.innerText;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopySuccess("Copied!");
        setTimeout(() => setCopySuccess(""), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
        setCopySuccess("Failed to copy");
      });
  };

  const handleTypeToggle = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((item) => item !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const handleLangToggle = (type) => {
    if (selectedLang.includes(type)) {
      setSelectedlang(selectedLang.filter((item) => item !== type));
    } else {
      setSelectedlang([...selectedLang, type]);
    }
  };

  const handleFocusAreaToggle = (type) => {
    console.log(type);
    if (selectedFoucsArea.includes(type)) {
      setSelectedFoucsArea(selectedFoucsArea.filter((item) => item !== type));
    } else {
      setSelectedFoucsArea([...selectedFoucsArea, type]);
    }
  };

  const newJobDetail = {
    id: Date.now(),
    stu_company_name: "",
    stu_job_title: "",
    stu_role_description: "",
    stu_job_duration: "",
  };

  const newInternshipDetail = {
    id: Date.now(),
    stu_in_company_name: "",
    stu_in_job_title: "",
    stu_in_role_description: "",
    stu_in_job_duration: "",
  };

  const deleteJobDetail = (id) => {
    //console.log(studentData.stu_job_details, id)
    setStudentData((prevData) => ({
      ...prevData,
      stu_job_details: prevData.stu_job_details.filter((job) => job.id !== id),
    }));
  };

  const deleteInternshipDetail = (id) => {
    //console.log(studentData.stu_job_details, id)
    setStudentData((prevData) => ({
      ...prevData,
      stu_internship_details: prevData.stu_internship_details.filter(
        (job) => job.id !== id
      ),
    }));
  };

  const NextBtn = (id) => {
    return (
      <div
        onClick={() => setSelectedOption(id)}
        className="btn sub_btn pointer"
      >
        Next
      </div>
    );
  };

  const PrevBtn = (id) => {
    return (
      <div
        onClick={() => setSelectedOption(id)}
        className="btn second_btn pointer"
      >
        Prev
      </div>
    );
  };

  const SkipBtn = (id) => {
    return (
      <div
        onClick={() => setSelectedOption(id)}
        className="btn second_btn pointer"
      >
        Skip
      </div>
    );
  };

  console.log(studentData);

  return (
    <div>
      {loader && <Loader />}
      {/* <input
        type="text"
        //onChange={(e) => setText(e.target.value)}
        //value={text}
      /> */}

      <div className="form-module-padding-v-2 ">
        <div className="form-module-v-2">
          <div className="form-header">
            <div className="main-heading">AI SOP Generator</div>
            <div className="main-content">
              Use the form below to provide your personal and academic details.
              Once completed, click "Next" to generate your Statement of Purpose
              (SOP) based on the provided information. Ensure all fields are
              filled out accurately to receive the best results.
            </div>
            <div
              data-orientation="horizontal"
              role="none"
              class="horizontal-divider"
            ></div>
          </div>

          <div className="container-fluid main">
            <div className="row">
              <div className="col-md-3 side-bar">
                <div className="side-bar-main">
                  {sidebar.map((item) => (
                    <div className="side-bar-wrapper">
                      <div
                        onClick={() => setSelectedOption(item.id)}
                        className={`side-bar-item pointer ${
                          selectedOption == item.id && "side-bar-item-selected"
                        } `}
                      >
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-md-9">
                {selectedOption === "1" && (
                  <div className="form-module-wrapper-v-2 step-1">
                    <div className="two-fields">
                      <NameField
                        value={studentData.stu_name}
                        studentData={studentData}
                        stu_data_obj="stu_name"
                        placeholder="Student Name"
                        custom_css1="mar_right"
                        custom_css2="input-field"
                        setStudentData={setStudentData}
                      />

                      <NameField
                        value={studentData.stu_city}
                        studentData={studentData}
                        stu_data_obj="stu_city"
                        placeholder="Student City"
                        custom_css1="mar_right"
                        custom_css2="input-field"
                        setStudentData={setStudentData}
                      />

                      <select
                        className="input-field mar_right select_dropdown"
                        name="cars"
                        id="cars"
                      >
                        {countryList.map((item) => (
                          <option value={item.name}>{item.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="two-fields">
                      <NameField
                        value={studentData.stu_address}
                        studentData={studentData}
                        stu_data_obj="stu_address"
                        placeholder="Student Address"
                        custom_css1="mar_right"
                        custom_css2="input-field"
                        setStudentData={setStudentData}
                      />
                    </div>

                    <div className="two-fields">
                      <NameField
                        value={studentData.stu_fatherName}
                        studentData={studentData}
                        stu_data_obj="stu_fatherName"
                        placeholder="Father Name"
                        custom_css1="mar_right"
                        custom_css2="input-field"
                        setStudentData={setStudentData}
                      />

                      <NameField
                        value={studentData.stu_motherName}
                        studentData={studentData}
                        stu_data_obj="stu_motherName"
                        placeholder="Mother Name"
                        custom_css1="mar_right"
                        custom_css2="input-field"
                        setStudentData={setStudentData}
                      />
                    </div>

                    <div className="two-fields">
                      <NameField
                        value={studentData.stu_fatherOccupation}
                        studentData={studentData}
                        stu_data_obj="stu_fatherOccupation"
                        placeholder="Father’s Occupation"
                        custom_css1="mar_right"
                        custom_css2="input-field"
                        setStudentData={setStudentData}
                      />

                      <NameField
                        value={studentData.stu_motherOccupation}
                        studentData={studentData}
                        stu_data_obj="stu_motherOccupation"
                        placeholder="Mother’s Occupation"
                        custom_css1="mar_right"
                        custom_css2="input-field"
                        setStudentData={setStudentData}
                      />

                      <NameField
                        value={studentData.stu_familyDetails}
                        studentData={studentData}
                        stu_data_obj="stu_familyDetails"
                        placeholder="Family Details"
                        custom_css1="mar_right"
                        custom_css2="input-field"
                        setStudentData={setStudentData}
                      />
                    </div>

                    <div className="two-fields">
                      <NameField
                        value={studentData.stu_universityName}
                        studentData={studentData}
                        stu_data_obj="stu_universityName"
                        placeholder="University/Institute Name"
                        custom_css1="mar_right"
                        custom_css2="input-field"
                        setStudentData={setStudentData}
                      />

                      <NameField
                        value={studentData.stu_universityCountry}
                        studentData={studentData}
                        stu_data_obj="stu_universityCountry"
                        placeholder="University Address"
                        custom_css1="mar_right"
                        custom_css2="input-field"
                        setStudentData={setStudentData}
                      />
                    </div>

                    <div className="two-fields">
                      <RadioBoxSelection
                        heading="Student Degree"
                        array={degrees}
                        value={studentData.stu_degreeLevel}
                        stu_data_obj="stu_degreeLevel"
                        studentData={studentData}
                        setStudentData={setStudentData}
                      />
                    </div>
                    <div className="two-fields">
                      <RadioBoxSelection
                        heading="Student Study Subject"
                        array={subjects}
                        value={studentData.stu_interested_field}
                        stu_data_obj="stu_interested_field"
                        studentData={studentData}
                        setStudentData={setStudentData}
                      />
                    </div>

                    <div className="two-fields">
                      <NameField
                        value={studentData.stu_interested_specialization}
                        studentData={studentData}
                        stu_data_obj="stu_interested_specialization"
                        placeholder="Student Specialization"
                        custom_css1="mar_right"
                        custom_css2="input-field"
                        setStudentData={setStudentData}
                      />
                    </div>

                    {NextBtn("2")}

                    {/* <div onClick={handleSubmit} className="btn sub_btn pointer">
                      Next
                    </div> */}
                  </div>
                )}
                {selectedOption === "2" && (
                  <div className="form-module-wrapper-v-2 step-1">
                    <div className="two-fields">
                      <NameField
                        value={studentData.stu_academicDetails_un}
                        studentData={studentData}
                        stu_data_obj="stu_academicDetails_un"
                        placeholder="Institution Name"
                        custom_css1="mar_right"
                        custom_css2="input-field"
                        setStudentData={setStudentData}
                      />

                      <NameField
                        value={studentData.stu_academicDetails_year}
                        studentData={studentData}
                        stu_data_obj="stu_academicDetails_year"
                        placeholder="Graduation Year"
                        custom_css1="mar_right"
                        custom_css2="input-field"
                        setStudentData={setStudentData}
                      />

                      <NameField
                        value={studentData.stu_academicDetails_gpa}
                        studentData={studentData}
                        stu_data_obj="stu_academicDetails_gpa"
                        placeholder="GPA/Percentage"
                        custom_css1="mar_right"
                        custom_css2="input-field"
                        setStudentData={setStudentData}
                      />
                    </div>

                    <div className="two-fields">
                      <RadioBoxSelection
                        heading="Highest Degree Completed"
                        array={degrees}
                        value={studentData.stu_academicDetails_degree}
                        stu_data_obj="stu_academicDetails_degree"
                        studentData={studentData}
                        setStudentData={setStudentData}
                      />
                    </div>

                    <div className="two-fields">
                      <NameField
                        value={studentData.stu_academicDetails_subjects}
                        studentData={studentData}
                        stu_data_obj="stu_academicDetails_subjects"
                        placeholder="Relevant Coursework e.g., Data Structures, Marketing Research, etc. "
                        custom_css1="mar_right"
                        custom_css2="input-field"
                        setStudentData={setStudentData}
                      />
                    </div>

                    <div className="two-fields">
                      <TextAreaField
                        value={studentData.stu_academicDetails_awards}
                        studentData={studentData}
                        stu_data_obj="stu_academicDetails_awards"
                        placeholder="Academic Achievements/Awards"
                        custom_css1="mar_right"
                        custom_css2="input-field"
                        setStudentData={setStudentData}
                      />
                    </div>

                    <div className="two-fields">
                      <TextAreaField
                        value={studentData.stu_academicDetails_research_exp}
                        studentData={studentData}
                        stu_data_obj="stu_academicDetails_research_exp"
                        placeholder="Research Experience"
                        custom_css1="mar_right"
                        custom_css2="input-field"
                        setStudentData={setStudentData}
                      />
                    </div>

                    <div className="d-flex justify-content-between">
                      <div className="d-flex">
                        {/* <div
                          onClick={handleSubmit}
                          className="btn second_btn pointer"
                        >
                          Prev
                        </div>
                        <div
                          onClick={handleSubmit}
                          className="btn second_btn pointer"
                        >
                          Skip
                        </div> */}

                        {PrevBtn("1")}
                        {SkipBtn("3")}
                      </div>
                      {/* <div
                        onClick={handleSubmit}
                        className="btn sub_btn pointer"
                      >
                        Next
                      </div> */}
                      {NextBtn("3")}
                    </div>
                  </div>
                )}

                {selectedOption === "3" && (
                  <div className="form-module-wrapper-v-2 step-1">
                    <div
                      className={
                        studentData.stu_job_details.length > 0 && `work-exp-box`
                      }
                    >
                      <div className="two-fields">
                        <div
                          className="input-field mar_right d-flex justify-content-between"
                          onClick={() => {
                            // setAddExperince(addExperince + 1),
                            setStudentData((prevData) => ({
                              ...prevData,
                              stu_job_details: [
                                ...prevData.stu_job_details,
                                newJobDetail,
                              ],
                            }));
                          }}
                        >
                          <div>Add Work Experience</div>
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-plus"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className="pb-2 margin-right-16">
                        {studentData.stu_job_details.map((job, jobIndex) => (
                          <div key={job.id} className="d-flex">
                            <div
                              className={`input-field-wrapper mar_right w-50`}
                            >
                              <input
                                type="text"
                                placeholder="Company Name "
                                className="input-field"
                                value={job.stu_company_name}
                                onChange={(e) => {
                                  const updatedJobDetails = [
                                    ...studentData.stu_job_details,
                                  ];
                                  updatedJobDetails[jobIndex].stu_company_name =
                                    e.target.value;
                                  setStudentData({
                                    ...studentData,
                                    stu_job_details: updatedJobDetails,
                                  });
                                }}
                              />
                            </div>
                            <div
                              className={`input-field-wrapper mar_right w-50`}
                            >
                              <input
                                type="text"
                                className="input-field"
                                placeholder="Job Title"
                                value={job.stu_job_title}
                                onChange={(e) => {
                                  const updatedJobDetails = [
                                    ...studentData.stu_job_details,
                                  ];
                                  updatedJobDetails[jobIndex].stu_job_title =
                                    e.target.value;
                                  setStudentData({
                                    ...studentData,
                                    stu_job_details: updatedJobDetails,
                                  });
                                }}
                              />
                            </div>
                            <div className={`input-field-wrapper mar_right`}>
                              <input
                                type="text"
                                className="input-field"
                                value={job.stu_job_duration}
                                placeholder="Job Duration"
                                onChange={(e) => {
                                  const updatedJobDetails = [
                                    ...studentData.stu_job_details,
                                  ];
                                  updatedJobDetails[jobIndex].stu_job_duration =
                                    e.target.value;
                                  setStudentData({
                                    ...studentData,
                                    stu_job_details: updatedJobDetails,
                                  });
                                }}
                              />
                            </div>
                            <div className={`input-field-wrapper mar_right `}>
                              <input
                                type="text"
                                className="input-field"
                                placeholder="Role Description"
                                value={job.stu_role_description}
                                onChange={(e) => {
                                  const updatedJobDetails = [
                                    ...studentData.stu_job_details,
                                  ];
                                  updatedJobDetails[
                                    jobIndex
                                  ].stu_role_description = e.target.value;
                                  setStudentData({
                                    ...studentData,
                                    stu_job_details: updatedJobDetails,
                                  });
                                }}
                              />
                            </div>

                            <div
                              className=" delete-btn"
                              onClick={() => deleteJobDetail(job.id)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-trash"
                                viewBox="0 0 16 16"
                              >
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                              </svg>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div
                      className={
                        studentData.stu_internship_details.length > 0 &&
                        `work-exp-box`
                      }
                    >
                      <div className="two-fields">
                        <div
                          className="input-field mar_right d-flex justify-content-between"
                          onClick={() => {
                            // setAddExperince(addExperince + 1),
                            setStudentData((prevData) => ({
                              ...prevData,
                              stu_internship_details: [
                                ...prevData.stu_internship_details,
                                newInternshipDetail,
                              ],
                            }));
                          }}
                        >
                          <div>Add Internships</div>
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-plus"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className="pb-2 margin-right-16">
                        {studentData.stu_internship_details.map(
                          (job, jobIndex) => (
                            <div key={job.id} className="d-flex">
                              <div
                                className={`input-field-wrapper mar_right w-50`}
                              >
                                <input
                                  type="text"
                                  placeholder="Company Name "
                                  className="input-field"
                                  value={job.stu_in_company_name}
                                  onChange={(e) => {
                                    const updatedJobDetails = [
                                      ...studentData.stu_internship_details,
                                    ];
                                    updatedJobDetails[
                                      jobIndex
                                    ].stu_in_company_name = e.target.value;
                                    setStudentData({
                                      ...studentData,
                                      stu_internship_details: updatedJobDetails,
                                    });
                                  }}
                                />
                              </div>
                              <div
                                className={`input-field-wrapper mar_right w-50`}
                              >
                                <input
                                  type="text"
                                  className="input-field"
                                  placeholder="Job Title"
                                  value={job.stu_in_job_title}
                                  onChange={(e) => {
                                    const updatedJobDetails = [
                                      ...studentData.stu_internship_details,
                                    ];
                                    updatedJobDetails[
                                      jobIndex
                                    ].stu_in_job_title = e.target.value;
                                    setStudentData({
                                      ...studentData,
                                      stu_internship_details: updatedJobDetails,
                                    });
                                  }}
                                />
                              </div>
                              <div className={`input-field-wrapper mar_right`}>
                                <input
                                  type="text"
                                  className="input-field"
                                  value={job.stu_in_job_duration}
                                  placeholder="Job Duration"
                                  onChange={(e) => {
                                    const updatedJobDetails = [
                                      ...studentData.stu_internship_details,
                                    ];
                                    updatedJobDetails[
                                      jobIndex
                                    ].stu_in_job_duration = e.target.value;
                                    setStudentData({
                                      ...studentData,
                                      stu_internship_details: updatedJobDetails,
                                    });
                                  }}
                                />
                              </div>
                              <div className={`input-field-wrapper mar_right `}>
                                <input
                                  type="text"
                                  className="input-field"
                                  placeholder="Role Description"
                                  value={job.stu_in_role_description}
                                  onChange={(e) => {
                                    const updatedJobDetails = [
                                      ...studentData.stu_internship_details,
                                    ];
                                    updatedJobDetails[
                                      jobIndex
                                    ].stu_in_role_description = e.target.value;
                                    setStudentData({
                                      ...studentData,
                                      stu_internship_details: updatedJobDetails,
                                    });
                                  }}
                                />
                              </div>

                              <div
                                className=" delete-btn"
                                onClick={() => deleteInternshipDetail(job.id)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-trash"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                </svg>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    <div className="two-fields">
                      <NameField
                        value={studentData.stu_professional_achievements}
                        studentData={studentData}
                        stu_data_obj="stu_professional_achievements"
                        placeholder="Professional Achievements"
                        custom_css1="mar_right"
                        custom_css2="input-field"
                        setStudentData={setStudentData}
                      />
                      <NameField
                        value={studentData.stu_skills_acquired}
                        studentData={studentData}
                        stu_data_obj="stu_skills_acquired"
                        placeholder="Relevant Skills Acquired "
                        custom_css1="mar_right"
                        custom_css2="input-field"
                        setStudentData={setStudentData}
                      />
                    </div>

                    <div className="two-fields">
                      <NameField
                        value={studentData.stu_technical_skills}
                        studentData={studentData}
                        stu_data_obj="stu_technical_skills"
                        placeholder="List relevant technical skills (e.g., programming languages, tools etc.)"
                        custom_css1="mar_right"
                        custom_css2="input-field"
                        setStudentData={setStudentData}
                      />
                      <NameField
                        value={studentData.stu_certifications}
                        studentData={studentData}
                        stu_data_obj="Certifications"
                        placeholder="Professional certifications (e.g., PMP, AWS Certified, etc.)."
                        custom_css1="mar_right"
                        custom_css2="input-field"
                        setStudentData={setStudentData}
                      />
                    </div>

                    <div className="two-fields">
                      <div className="w-100 m-1 mb-3">
                        <span className="pro_heading">
                          Languages You Know (You can select multiple options)
                        </span>
                        <div className="d-flex flex-wrap text-center d-flex align-items-center">
                          {languagesSpoken.map((item) => (
                            <div
                              className={`pro_radio_btn_1 ${
                                selectedLang.includes(item.value)
                                  ? " pro_selected"
                                  : ""
                              }`}
                              onClick={() => handleLangToggle(item.value)}
                            >
                              {item.value}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between">
                      <div className="d-flex">
                        {/* <div
                          onClick={handleSubmit}
                          className="btn second_btn pointer"
                        >
                          Prev
                        </div>
                        <div
                          onClick={handleSubmit}
                          className="btn second_btn pointer"
                        >
                          Skip
                        </div> */}

                        {PrevBtn("2")}
                        {SkipBtn("5")}
                      </div>
                      {/* <div
                        onClick={handleSubmit}
                        className="btn sub_btn pointer"
                      >
                        Next
                      </div> */}
                      {NextBtn("5")}
                    </div>
                  </div>
                )}
                {/* {selectedOption === "4" && (
                  <div className="form-module-wrapper-v-2 step-1">
                    <div className="two-fields">
                      <TextAreaField
                        value={studentData.stu_why_choose_program}
                        studentData={studentData}
                        stu_data_obj="stu_why_choose_program"
                        placeholder="Reason for Choosing the Program"
                        custom_css1="mar_right"
                        custom_css2="input-field"
                        setStudentData={setStudentData}
                      />
                    </div>

                    <div className="two-fields">
                      <TextAreaField
                        value={studentData.stu_short_term_goals}
                        studentData={studentData}
                        stu_data_obj="stu_short_term_goals"
                        placeholder="Short-Term Goals"
                        custom_css1="mar_right"
                        custom_css2="input-field"
                        setStudentData={setStudentData}
                      />

                      <TextAreaField
                        value={studentData.stu_long_term_goals}
                        studentData={studentData}
                        stu_data_obj="stu_long_term_goals"
                        placeholder="Long-Term Goals"
                        custom_css1="mar_right"
                        custom_css2="input-field"
                        setStudentData={setStudentData}
                      />
                    </div>

                    <div className="two-fields">
                      <TextAreaField
                        value={studentData.stu_why_this_uni}
                        studentData={studentData}
                        stu_data_obj="stu_why_this_uni"
                        placeholder="Why This University?"
                        custom_css1="mar_right"
                        custom_css2="input-field"
                        setStudentData={setStudentData}
                      />
                    </div>
                    <div className="two-fields">
                      <TextAreaField
                        value={studentData.stu_research_interests}
                        studentData={studentData}
                        stu_data_obj="stu_research_interests"
                        placeholder="Research Interests"
                        custom_css1="mar_right"
                        custom_css2="input-field"
                        setStudentData={setStudentData}
                      />
                    </div>

                    <div className="two-fields">
                      <TextAreaField
                        value={studentData.stu_prog_align_goals}
                        studentData={studentData}
                        stu_data_obj="stu_prog_align_goals"
                        placeholder="How the Program Aligns with Career Goals"
                        custom_css1="mar_right"
                        custom_css2="input-field"
                        setStudentData={setStudentData}
                      />

                      <TextAreaField
                        value={studentData.stu_growth_development}
                        studentData={studentData}
                        stu_data_obj="stu_growth_development"
                        placeholder="Personal or Professional Development"
                        custom_css1="mar_right"
                        custom_css2="input-field"
                        setStudentData={setStudentData}
                      />
                    </div>

                    <div className="d-flex justify-content-between">
                      <div className="d-flex">
                        
                        {PrevBtn("3")}
                        
                        {SkipBtn("5")}
                      </div>
                     
                      {NextBtn("5")}
                    </div>
                  </div>
                )} */}
                {selectedOption === "5" && (
                  <div className="form-module-wrapper-v-2 step-1">
                    <div className="two-fields">
                      <TextAreaField
                        value={studentData.stu_extracurricular_involvement}
                        studentData={studentData}
                        stu_data_obj="stu_extracurricular_involvement"
                        placeholder="Extracurricular Involvement"
                        custom_css1="mar_right"
                        custom_css2="input-field"
                        setStudentData={setStudentData}
                      />
                    </div>

                    <div className="two-fields">
                      <TextAreaField
                        value={studentData.stu_leadership_roles}
                        studentData={studentData}
                        stu_data_obj="stu_leadership_roles"
                        placeholder="Leadership Roles (e.g., Club President, Team Leader)"
                        custom_css1="mar_right"
                        custom_css2="input-field"
                        setStudentData={setStudentData}
                      />
                    </div>
                    <div className="two-fields">
                      <TextAreaField
                        value={studentData.stu_community_service}
                        studentData={studentData}
                        stu_data_obj="stu_community_service"
                        placeholder="Community Service/Volunteering"
                        custom_css1="mar_right"
                        custom_css2="input-field"
                        setStudentData={setStudentData}
                      />
                    </div>

                    <div className="two-fields">
                      <TextAreaField
                        value={studentData.stu_hobbies}
                        studentData={studentData}
                        stu_data_obj="stu_hobbies"
                        placeholder="Hobbies and Interests"
                        custom_css1="mar_right"
                        custom_css2="input-field"
                        setStudentData={setStudentData}
                      />
                    </div>

                    <div className="d-flex justify-content-between">
                      <div className="d-flex">
                        {/* <div
                          onClick={handleSubmit}
                          className="btn second_btn pointer"
                        >
                           {PrevBtn("4")}
                        </div> */}
                        {PrevBtn("3")}
                        {/* <div
                          onClick={handleSubmit}
                          className="btn second_btn pointer"
                        >
                           {SkipBtn("6")}
                        </div> */}
                        {SkipBtn("7")}
                      </div>
                      {/* <div
                        onClick={handleSubmit}
                        className="btn sub_btn pointer"
                      >
                         {NextBtn("6")}
                      </div> */}
                      {NextBtn("7")}
                    </div>
                  </div>
                )}
                {selectedOption === "7" && (
                  <div className="form-module-wrapper-v-2 step-1">
                    <div className="two-fields">
                      <TextAreaField
                        value={studentData.stu_personal_challengese}
                        studentData={studentData}
                        stu_data_obj="stu_personal_challengese"
                        placeholder="Personal Challenges"
                        custom_css1="mar_right"
                        custom_css2="input-field"
                        setStudentData={setStudentData}
                      />
                    </div>

                    <div className="two-fields">
                      <TextAreaField
                        value={studentData.stu_learning_from_mistakes}
                        studentData={studentData}
                        stu_data_obj="stu_learning_from_mistakes"
                        placeholder="Learning from Mistakes"
                        custom_css1="mar_right"
                        custom_css2="input-field"
                        setStudentData={setStudentData}
                      />
                    </div>

                    <div className="d-flex justify-content-between">
                      <div className="d-flex">
                        {/* <div
                          onClick={handleSubmit}
                          className="btn second_btn pointer"
                        >
                           {PrevBtn("6")}
                        </div> */}
                        {PrevBtn("5")}
                        {/* <div
                          onClick={handleSubmit}
                          className="btn second_btn pointer"
                        >
                          
                        </div> */}
                        {SkipBtn("8")}
                      </div>
                      {/* <div
                        onClick={handleSubmit}
                        className="btn sub_btn pointer"
                      >
                         
                      </div> */}
                      {NextBtn("8")}
                    </div>
                  </div>
                )}
                {selectedOption === "8" && (
                  <div className="form-module-wrapper-v-2 step-1">
                    <div className="two-fields">
                      <TextAreaField
                        value={studentData.stu_additional_points_highlight}
                        studentData={studentData}
                        stu_data_obj="stu_additional_points_highlight"
                        placeholder="Additional Points to Highlight, which hasn’t been covered in other sections"
                        custom_css1="mar_right"
                        custom_css2="input-field"
                        setStudentData={setStudentData}
                      />
                    </div>

                    <div className="two-fields">
                      <TextAreaField
                        value={studentData.stu_special_Circumstances}
                        studentData={studentData}
                        stu_data_obj="stu_special_Circumstances"
                        placeholder="Special Circumstances (e.g., gaps in education, career changes)"
                        custom_css1="mar_right"
                        custom_css2="input-field"
                        setStudentData={setStudentData}
                      />
                    </div>

                    <div className="d-flex justify-content-between">
                      <div className="d-flex">
                        {/* <div
                          onClick={handleSubmit}
                          className="btn second_btn pointer"
                        >
                          {PrevBtn("7")}
                        </div> */}
                        {PrevBtn("7")}
                        {/* <div
                          onClick={handleSubmit}
                          className="btn second_btn pointer"
                        >
                          
                        </div> */}
                        {SkipBtn("9")}
                      </div>
                      {/* <div
                        onClick={handleSubmit}
                        className="btn sub_btn pointer"
                      >
                        
                      </div> */}
                      {NextBtn("9")}
                    </div>
                  </div>
                )}

                {selectedOption === "9" && (
                  <div className="form-module-wrapper-v-2 step-1">
                    <div className="two-fields">
                      <RadioBoxSelection
                        heading="Tone Preference"
                        array={tonePreference}
                        value={studentData.stu_sop_tone_preference}
                        stu_data_obj="stu_sop_tone_preference"
                        studentData={studentData}
                        setStudentData={setStudentData}
                      />
                    </div>

                    <div className="w-100 m-1 mb-3">
                      <span className="pro_heading">
                        Focus Areas of SOP (You can select multiple options)
                      </span>
                      <div className="d-flex flex-wrap text-center d-flex align-items-center">
                        {focusArea.map((item) => (
                          <div
                            className={`pro_radio_btn_1 ${
                              selectedFoucsArea.includes(item.value)
                                ? " pro_selected"
                                : ""
                            }`}
                            onClick={() => handleFocusAreaToggle(item.value)}
                          >
                            {item.value}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="two-fields">
                      <TextAreaField
                        value={studentData.stu_special_Circumstances}
                        studentData={studentData}
                        stu_data_obj="stu_special_Circumstances"
                        placeholder="Special Circumstances (e.g., gaps in education, career changes)"
                        custom_css1="mar_right"
                        custom_css2="input-field"
                        setStudentData={setStudentData}
                      />
                    </div>

                    <div className="two-fields">
                      <NameField
                        value={studentData.stu_wordLimit}
                        studentData={studentData}
                        stu_data_obj="stu_wordLimit"
                        placeholder="Length of SOP"
                        custom_css1="mar_right"
                        custom_css2="input-field"
                        setStudentData={setStudentData}
                      />
                    </div>

                    {/* stu_why_choose_program: "",
    stu_short_term_goals: "",
    stu_long_term_goals: "",
    stu_why_this_uni: "",
    stu_research_interests: "",
    stu_prog_align_goals: "",
    stu_growth_development: "", */}



                    <CheckboxField
                      content={`Reason for choosing this University .`}
                      studentData={studentData}
                      setStudentData={setStudentData}
                      stu_data_obj_key={studentData.stu_why_choose_program}
                      stu_data_obj="stu_why_choose_program"
                    />

                    <CheckboxField
                      content={`Short Terms Goals`}
                      studentData={studentData}
                      setStudentData={setStudentData}
                      stu_data_obj_key={studentData.stu_short_term_goals}
                      stu_data_obj="stu_short_term_goals"
                    />

                    <CheckboxField
                      content={`Long Term Goals`}
                      studentData={studentData}
                      setStudentData={setStudentData}
                      stu_data_obj_key={studentData.stu_long_term_goals}
                      stu_data_obj="stu_long_term_goals"
                    />

                    <CheckboxField
                      content={`Reasons for applying to this University`}
                      studentData={studentData}
                      setStudentData={setStudentData}
                      stu_data_obj_key={studentData.stu_why_this_uni}
                      stu_data_obj="stu_why_this_uni"
                    />

                    <CheckboxField
                      content={`Reason for applying for the course`}
                      studentData={studentData}
                      setStudentData={setStudentData}
                      stu_data_obj_key={studentData.stu_research_interests}
                      stu_data_obj="stu_research_interests"
                    />

                    <CheckboxField
                      content={`career opportunity after completing the course`}
                     
                      studentData={studentData}
                      setStudentData={setStudentData}
                      stu_data_obj_key={studentData.stu_prog_align_goals}
                      stu_data_obj="stu_prog_align_goals"
                    />

                    <CheckboxField
                      content={`career Growth and development opportunity`}
                      studentData={studentData}
                      setStudentData={setStudentData}
                      stu_data_obj_key={studentData.stu_growth_development}
                      stu_data_obj="stu_growth_development"
                    />

                    <CheckboxField
                      content={`I declare that the information provided in this form is
                      true and accurate to the best of my knowledge. I
                      acknowledge that any false information may result in
                      disqualification or legal action.`}
                      studentData={studentData}
                      setStudentData={setStudentData}
                      stu_data_obj_key={studentData.stu_declaration}
                      stu_data_obj="stu_declaration"
                    />

                    <CheckboxField
                      content={`I hereby give my consent for the collection and processing
                      of my personal information as outlined in the privacy
                      policy. I understand that my information will be used
                      solely for the purposes specified.`}
                      studentData={studentData}
                      setStudentData={setStudentData}
                      stu_data_obj_key={studentData.stu_consent}
                      stu_data_obj="stu_consent"
                    />

                    {/* <div class="form-check two-fields">
                      <input
                        class="form-check-input checkbox-field"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                        onChange={(e) => {
                          setStudentData({
                            ...studentData,
                            stu_declaration: !studentData.stu_declaration,
                          });
                        }}
                      />
                      I declare that the information provided in this form is
                      true and accurate to the best of my knowledge. I
                      acknowledge that any false information may result in
                      disqualification or legal action.
                    </div>
                    <div class="form-check two-fields">
                      <input
                        class="form-check-input checkbox-field"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                        onChange={(e) => {
                          setStudentData({
                            ...studentData,
                            stu_consent: !studentData.stu_consent,
                          });
                        }}
                      />
                      I hereby give my consent for the collection and processing
                      of my personal information as outlined in the privacy
                      policy. I understand that my information will be used
                      solely for the purposes specified.
                    </div> */}

                    <div className="d-flex justify-content-between">
                      <div className="d-flex">
                        {/* <div
                          onClick={handleSubmit}
                          className="btn second_btn pointer"
                        >
                          Prev
                        </div> */}
                        {PrevBtn("8")}
                      </div>
                      <div
                        onClick={handleSubmit}
                        className="btn sub_btn pointer"
                      >
                        Generate SOP
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {res !== "" && (
        <div className="form-module-padding-v-2 ">
          <div ref={targetRef} className="res-text form-module-v-2">
            <div className="container-fluid main">
              <div className="row">
                <div className="col-md-12 side-bar">
                  <div
                    className="copy-content d-flex pointer"
                    onClick={handleCopy}
                  >
                    <div>
                      {copySuccess == "" ? (
                        <div className="share-type-name">Copy To clipboard</div>
                      ) : (
                        <div className="share-type-name">
                          Copied To clipboard
                        </div>
                      )}
                    </div>
                  </div>
                  <ReactMarkDown>{res.text}</ReactMarkDown>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AiGenVer2;
