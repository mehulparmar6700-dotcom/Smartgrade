import { StudentRecord, DatasetSummary } from '../types';

export const RAW_STUDENT_DATA: StudentRecord[] = [
  { Student_ID: "STD-1001", Student_Name: "Aarav Sharma", Gender: "Male", Age: 19, Attendance_Percentage: 92, Study_Hours_Per_Day: 6.5, Previous_Score: 88, Assignment_Score: 94, Midterm_Score: 90, Final_Exam_Score: 92, Practical_Score: 95, Internal_Marks: 94.6, Total_Marks: 91.9, Grade: "A+", Result: "Pass" },
  { Student_ID: "STD-1002", Student_Name: "Ananya Patel", Gender: "Female", Age: 20, Attendance_Percentage: 88, Study_Hours_Per_Day: 5.0, Previous_Score: 82, Assignment_Score: 86, Midterm_Score: 84, Practical_Score: 90, Final_Exam_Score: 85, Internal_Marks: 88.4, Total_Marks: 85.4, Grade: "A", Result: "Pass" },
  { Student_ID: "STD-1003", Student_Name: "Rohan Verma", Gender: "Male", Age: 19, Attendance_Percentage: 74, Study_Hours_Per_Day: 3.5, Previous_Score: 68, Assignment_Score: 72, Midterm_Score: 70, Practical_Score: 78, Final_Exam_Score: 72, Internal_Marks: 75.6, Total_Marks: 72.1, Grade: "B", Result: "Pass" },
  { Student_ID: "STD-1004", Student_Name: "Priya Singh", Gender: "Female", Age: 21, Attendance_Percentage: 95, Study_Hours_Per_Day: 7.0, Previous_Score: 92, Assignment_Score: 98, Midterm_Score: 95, Practical_Score: 96, Final_Exam_Score: 96, Internal_Marks: 96.8, Total_Marks: 95.9, Grade: "A+", Result: "Pass" },
  { Student_ID: "STD-1005", Student_Name: "Rahul Kumar", Gender: "Male", Age: 20, Attendance_Percentage: 58, Study_Hours_Per_Day: 1.5, Previous_Score: 48, Assignment_Score: 55, Midterm_Score: 46, Practical_Score: 60, Final_Exam_Score: 42, Internal_Marks: 58.0, Total_Marks: 46.4, Grade: "F", Result: "Fail" },
  { Student_ID: "STD-1006", Student_Name: "Sneha Reddy", Gender: "Female", Age: 19, Attendance_Percentage: 86, Study_Hours_Per_Day: 4.5, Previous_Score: 76, Assignment_Score: 84, Midterm_Score: 78, Practical_Score: 85, Final_Exam_Score: 80, Internal_Marks: 84.6, Total_Marks: 80.3, Grade: "A", Result: "Pass" },
  { Student_ID: "STD-1007", Student_Name: "Vikram Malhotra", Gender: "Male", Age: 20, Attendance_Percentage: 81, Study_Hours_Per_Day: 4.0, Previous_Score: 70, Assignment_Score: 78, Midterm_Score: 74, Practical_Score: 80, Final_Exam_Score: 75, Internal_Marks: 79.2, Total_Marks: 75.5, Grade: "B", Result: "Pass" },
  { Student_ID: "STD-1008", Student_Name: "Neha Gupta", Gender: "Female", Age: 19, Attendance_Percentage: 90, Study_Hours_Per_Day: 6.0, Previous_Score: 85, Assignment_Score: 92, Midterm_Score: 88, Practical_Score: 92, Final_Exam_Score: 89, Internal_Marks: 92.0, Total_Marks: 89.3, Grade: "A", Result: "Pass" },
  { Student_ID: "STD-1009", Student_Name: "Aditya Joshi", Gender: "Male", Age: 21, Attendance_Percentage: 66, Study_Hours_Per_Day: 2.5, Previous_Score: 56, Assignment_Score: 62, Midterm_Score: 58, Practical_Score: 68, Final_Exam_Score: 55, Internal_Marks: 65.6, Total_Marks: 58.0, Grade: "D", Result: "Pass" },
  { Student_ID: "STD-1010", Student_Name: "Pooja Nair", Gender: "Female", Age: 20, Attendance_Percentage: 94, Study_Hours_Per_Day: 6.8, Previous_Score: 90, Assignment_Score: 95, Midterm_Score: 92, Practical_Score: 94, Final_Exam_Score: 93, Internal_Marks: 94.4, Total_Marks: 93.0, Grade: "A+", Result: "Pass" },
  { Student_ID: "STD-1011", Student_Name: "Karan Mehta", Gender: "Male", Age: 19, Attendance_Percentage: 78, Study_Hours_Per_Day: 3.8, Previous_Score: 72, Assignment_Score: 80, Midterm_Score: 76, Practical_Score: 82, Final_Exam_Score: 74, Internal_Marks: 81.2, Total_Marks: 76.0, Grade: "B", Result: "Pass" },
  { Student_ID: "STD-1012", Student_Name: "Divya Iyer", Gender: "Female", Age: 20, Attendance_Percentage: 89, Study_Hours_Per_Day: 5.5, Previous_Score: 84, Assignment_Score: 88, Midterm_Score: 86, Practical_Score: 90, Final_Exam_Score: 87, Internal_Marks: 89.2, Total_Marks: 87.1, Grade: "A", Result: "Pass" },
  { Student_ID: "STD-1013", Student_Name: "Manish Tiwari", Gender: "Male", Age: 22, Attendance_Percentage: 52, Study_Hours_Per_Day: 1.2, Previous_Score: 42, Assignment_Score: 50, Midterm_Score: 44, Practical_Score: 55, Final_Exam_Score: 38, Internal_Marks: 53.0, Total_Marks: 42.8, Grade: "F", Result: "Fail" },
  { Student_ID: "STD-1014", Student_Name: "Tanvi Deshmukh", Gender: "Female", Age: 19, Attendance_Percentage: 84, Study_Hours_Per_Day: 4.2, Previous_Score: 75, Assignment_Score: 82, Midterm_Score: 79, Practical_Score: 84, Final_Exam_Score: 77, Internal_Marks: 83.2, Total_Marks: 78.8, Grade: "B", Result: "Pass" },
  { Student_ID: "STD-1015", Student_Name: "Siddharth Rao", Gender: "Male", Age: 20, Attendance_Percentage: 91, Study_Hours_Per_Day: 6.2, Previous_Score: 87, Assignment_Score: 93, Midterm_Score: 89, Practical_Score: 92, Final_Exam_Score: 90, Internal_Marks: 92.4, Total_Marks: 90.2, Grade: "A+", Result: "Pass" },
  { Student_ID: "STD-1016", Student_Name: "Ritu Choudhary", Gender: "Female", Age: 21, Attendance_Percentage: 70, Study_Hours_Per_Day: 3.0, Previous_Score: 62, Assignment_Score: 70, Midterm_Score: 65, Practical_Score: 72, Final_Exam_Score: 64, Internal_Marks: 71.2, Total_Marks: 65.7, Grade: "C", Result: "Pass" },
  { Student_ID: "STD-1017", Student_Name: "Varun Bhatia", Gender: "Male", Age: 19, Attendance_Percentage: 87, Study_Hours_Per_Day: 5.2, Previous_Score: 81, Assignment_Score: 87, Midterm_Score: 83, Practical_Score: 88, Final_Exam_Score: 84, Internal_Marks: 87.6, Total_Marks: 84.4, Grade: "A", Result: "Pass" },
  { Student_ID: "STD-1018", Student_Name: "Kavita Saxena", Gender: "Female", Age: 20, Attendance_Percentage: 93, Study_Hours_Per_Day: 6.6, Previous_Score: 89, Assignment_Score: 96, Midterm_Score: 91, Practical_Score: 95, Final_Exam_Score: 92, Internal_Marks: 95.4, Total_Marks: 92.4, Grade: "A+", Result: "Pass" },
  { Student_ID: "STD-1019", Student_Name: "Arjun Nambiar", Gender: "Male", Age: 20, Attendance_Percentage: 62, Study_Hours_Per_Day: 2.0, Previous_Score: 52, Assignment_Score: 60, Midterm_Score: 54, Practical_Score: 65, Final_Exam_Score: 50, Internal_Marks: 63.0, Total_Marks: 53.8, Grade: "D", Result: "Pass" },
  { Student_ID: "STD-1020", Student_Name: "Isha Kapoor", Gender: "Female", Age: 19, Attendance_Percentage: 96, Study_Hours_Per_Day: 7.2, Previous_Score: 94, Assignment_Score: 99, Midterm_Score: 96, Practical_Score: 98, Final_Exam_Score: 97, Internal_Marks: 98.4, Total_Marks: 96.9, Grade: "A+", Result: "Pass" },
  { Student_ID: "STD-1021", Student_Name: "Deepak Soni", Gender: "Male", Age: 21, Attendance_Percentage: 76, Study_Hours_Per_Day: 3.6, Previous_Score: 69, Assignment_Score: 75, Midterm_Score: 72, Practical_Score: 80, Final_Exam_Score: 70, Internal_Marks: 78.0, Total_Marks: 72.2, Grade: "B", Result: "Pass" },
  { Student_ID: "STD-1022", Student_Name: "Meera Pillai", Gender: "Female", Age: 20, Attendance_Percentage: 85, Study_Hours_Per_Day: 4.8, Previous_Score: 79, Assignment_Score: 85, Midterm_Score: 81, Practical_Score: 86, Final_Exam_Score: 82, Internal_Marks: 85.6, Total_Marks: 82.4, Grade: "A", Result: "Pass" },
  { Student_ID: "STD-1023", Student_Name: "Nitin Agarwal", Gender: "Male", Age: 19, Attendance_Percentage: 68, Study_Hours_Per_Day: 2.8, Previous_Score: 58, Assignment_Score: 65, Midterm_Score: 60, Practical_Score: 70, Final_Exam_Score: 59, Internal_Marks: 68.0, Total_Marks: 61.1, Grade: "C", Result: "Pass" },
  { Student_ID: "STD-1024", Student_Name: "Swati Bhatt", Gender: "Female", Age: 20, Attendance_Percentage: 82, Study_Hours_Per_Day: 4.1, Previous_Score: 73, Assignment_Score: 81, Midterm_Score: 77, Practical_Score: 83, Final_Exam_Score: 76, Internal_Marks: 82.2, Total_Marks: 77.5, Grade: "B", Result: "Pass" },
  { Student_ID: "STD-1025", Student_Name: "Gaurav Sen", Gender: "Male", Age: 21, Attendance_Percentage: 55, Study_Hours_Per_Day: 1.8, Previous_Score: 46, Assignment_Score: 54, Midterm_Score: 48, Practical_Score: 58, Final_Exam_Score: 44, Internal_Marks: 56.4, Total_Marks: 47.7, Grade: "F", Result: "Fail" },
  { Student_ID: "STD-1026", Student_Name: "Harshita Jain", Gender: "Female", Age: 19, Attendance_Percentage: 92, Study_Hours_Per_Day: 6.4, Previous_Score: 86, Assignment_Score: 93, Midterm_Score: 89, Practical_Score: 93, Final_Exam_Score: 91, Internal_Marks: 93.0, Total_Marks: 90.8, Grade: "A+", Result: "Pass" },
  { Student_ID: "STD-1027", Student_Name: "Abhishek Roy", Gender: "Male", Age: 20, Attendance_Percentage: 79, Study_Hours_Per_Day: 3.9, Previous_Score: 71, Assignment_Score: 79, Midterm_Score: 75, Practical_Score: 81, Final_Exam_Score: 73, Internal_Marks: 80.2, Total_Marks: 75.0, Grade: "B", Result: "Pass" },
  { Student_ID: "STD-1028", Student_Name: "Shalini Menon", Gender: "Female", Age: 20, Attendance_Percentage: 88, Study_Hours_Per_Day: 5.1, Previous_Score: 80, Assignment_Score: 87, Midterm_Score: 82, Practical_Score: 89, Final_Exam_Score: 85, Internal_Marks: 88.2, Total_Marks: 84.7, Grade: "A", Result: "Pass" },
  { Student_ID: "STD-1029", Student_Name: "Yash Kulkarni", Gender: "Male", Age: 19, Attendance_Percentage: 64, Study_Hours_Per_Day: 2.2, Previous_Score: 54, Assignment_Score: 61, Midterm_Score: 56, Practical_Score: 66, Final_Exam_Score: 52, Internal_Marks: 64.0, Total_Marks: 55.6, Grade: "D", Result: "Pass" },
  { Student_ID: "STD-1030", Student_Name: "Tanya Kashyap", Gender: "Female", Age: 21, Attendance_Percentage: 97, Study_Hours_Per_Day: 7.5, Previous_Score: 95, Assignment_Score: 100, Midterm_Score: 97, Practical_Score: 99, Final_Exam_Score: 98, Internal_Marks: 99.4, Total_Marks: 98.0, Grade: "A+", Result: "Pass" },
  { Student_ID: "STD-1031", Student_Name: "Prateek Ghosh", Gender: "Male", Age: 20, Attendance_Percentage: 73, Study_Hours_Per_Day: 3.2, Previous_Score: 65, Assignment_Score: 73, Midterm_Score: 68, Practical_Score: 76, Final_Exam_Score: 67, Internal_Marks: 74.8, Total_Marks: 68.9, Grade: "C", Result: "Pass" },
  { Student_ID: "STD-1032", Student_Name: "Bhavna Trivedi", Gender: "Female", Age: 19, Attendance_Percentage: 86, Study_Hours_Per_Day: 4.6, Previous_Score: 78, Assignment_Score: 86, Midterm_Score: 80, Practical_Score: 87, Final_Exam_Score: 81, Internal_Marks: 86.6, Total_Marks: 81.8, Grade: "A", Result: "Pass" },
  { Student_ID: "STD-1033", Student_Name: "Rajesh Panda", Gender: "Male", Age: 22, Attendance_Percentage: 50, Study_Hours_Per_Day: 1.0, Previous_Score: 40, Assignment_Score: 48, Midterm_Score: 42, Practical_Score: 52, Final_Exam_Score: 36, Internal_Marks: 50.4, Total_Marks: 40.7, Grade: "F", Result: "Fail" },
  { Student_ID: "STD-1034", Student_Name: "Anjali Mishra", Gender: "Female", Age: 20, Attendance_Percentage: 91, Study_Hours_Per_Day: 6.1, Previous_Score: 87, Assignment_Score: 94, Midterm_Score: 90, Practical_Score: 93, Final_Exam_Score: 89, Internal_Marks: 93.4, Total_Marks: 90.2, Grade: "A+", Result: "Pass" },
  { Student_ID: "STD-1035", Student_Name: "Suraj Rathore", Gender: "Male", Age: 19, Attendance_Percentage: 80, Study_Hours_Per_Day: 4.0, Previous_Score: 72, Assignment_Score: 80, Midterm_Score: 75, Practical_Score: 82, Final_Exam_Score: 76, Internal_Marks: 81.2, Total_Marks: 76.7, Grade: "B", Result: "Pass" },
  { Student_ID: "STD-1036", Student_Name: "Kriti Sanon", Gender: "Female", Age: 20, Attendance_Percentage: 89, Study_Hours_Per_Day: 5.4, Previous_Score: 83, Assignment_Score: 89, Midterm_Score: 85, Practical_Score: 91, Final_Exam_Score: 86, Internal_Marks: 90.2, Total_Marks: 86.5, Grade: "A", Result: "Pass" },
  { Student_ID: "STD-1037", Student_Name: "Kartik Nair", Gender: "Male", Age: 21, Attendance_Percentage: 67, Study_Hours_Per_Day: 2.7, Previous_Score: 59, Assignment_Score: 66, Midterm_Score: 62, Practical_Score: 71, Final_Exam_Score: 58, Internal_Marks: 69.0, Total_Marks: 61.4, Grade: "C", Result: "Pass" },
  { Student_ID: "STD-1038", Student_Name: "Payal Singhal", Gender: "Female", Age: 19, Attendance_Percentage: 94, Study_Hours_Per_Day: 6.7, Previous_Score: 91, Assignment_Score: 96, Midterm_Score: 93, Practical_Score: 95, Final_Exam_Score: 94, Internal_Marks: 95.4, Total_Marks: 94.0, Grade: "A+", Result: "Pass" },
  { Student_ID: "STD-1039", Student_Name: "Mohit Chauhan", Gender: "Male", Age: 20, Attendance_Percentage: 75, Study_Hours_Per_Day: 3.4, Previous_Score: 67, Assignment_Score: 74, Midterm_Score: 69, Practical_Score: 77, Final_Exam_Score: 68, Internal_Marks: 75.8, Total_Marks: 69.9, Grade: "C", Result: "Pass" },
  { Student_ID: "STD-1040", Student_Name: "Lavanya Dutt", Gender: "Female", Age: 20, Attendance_Percentage: 87, Study_Hours_Per_Day: 5.0, Previous_Score: 81, Assignment_Score: 88, Midterm_Score: 83, Practical_Score: 89, Final_Exam_Score: 83, Internal_Marks: 88.6, Total_Marks: 84.1, Grade: "A", Result: "Pass" },
  { Student_ID: "STD-1041", Student_Name: "Girish Prasad", Gender: "Male", Age: 22, Attendance_Percentage: 54, Study_Hours_Per_Day: 1.6, Previous_Score: 45, Assignment_Score: 52, Midterm_Score: 47, Practical_Score: 57, Final_Exam_Score: 41, Internal_Marks: 55.0, Total_Marks: 45.6, Grade: "F", Result: "Fail" },
  { Student_ID: "STD-1042", Student_Name: "Sanjana Rao", Gender: "Female", Age: 19, Attendance_Percentage: 90, Study_Hours_Per_Day: 5.9, Previous_Score: 85, Assignment_Score: 91, Midterm_Score: 88, Practical_Score: 92, Final_Exam_Score: 88, Internal_Marks: 91.6, Total_Marks: 88.7, Grade: "A", Result: "Pass" },
  { Student_ID: "STD-1043", Student_Name: "Aakash Varma", Gender: "Male", Age: 20, Attendance_Percentage: 82, Study_Hours_Per_Day: 4.3, Previous_Score: 74, Assignment_Score: 82, Midterm_Score: 78, Practical_Score: 84, Final_Exam_Score: 77, Internal_Marks: 83.2, Total_Marks: 78.5, Grade: "B", Result: "Pass" },
  { Student_ID: "STD-1044", Student_Name: "Shruti Hegde", Gender: "Female", Age: 21, Attendance_Percentage: 95, Study_Hours_Per_Day: 7.1, Previous_Score: 93, Assignment_Score: 97, Midterm_Score: 94, Practical_Score: 97, Final_Exam_Score: 95, Internal_Marks: 97.0, Total_Marks: 95.1, Grade: "A+", Result: "Pass" },
  { Student_ID: "STD-1045", Student_Name: "Naveen Chawla", Gender: "Male", Age: 19, Attendance_Percentage: 69, Study_Hours_Per_Day: 2.9, Previous_Score: 61, Assignment_Score: 68, Midterm_Score: 63, Practical_Score: 73, Final_Exam_Score: 62, Internal_Marks: 71.0, Total_Marks: 64.1, Grade: "C", Result: "Pass" },
  { Student_ID: "STD-1046", Student_Name: "Riddhi Shah", Gender: "Female", Age: 20, Attendance_Percentage: 84, Study_Hours_Per_Day: 4.4, Previous_Score: 77, Assignment_Score: 84, Midterm_Score: 80, Practical_Score: 86, Final_Exam_Score: 79, Internal_Marks: 85.2, Total_Marks: 80.5, Grade: "A", Result: "Pass" },
  { Student_ID: "STD-1047", Student_Name: "Sameer Sheikh", Gender: "Male", Age: 21, Attendance_Percentage: 60, Study_Hours_Per_Day: 1.9, Previous_Score: 50, Assignment_Score: 58, Midterm_Score: 52, Practical_Score: 62, Final_Exam_Score: 48, Internal_Marks: 60.4, Total_Marks: 51.7, Grade: "D", Result: "Pass" },
  { Student_ID: "STD-1048", Student_Name: "Meenakshi Sundaram", Gender: "Female", Age: 20, Attendance_Percentage: 93, Study_Hours_Per_Day: 6.5, Previous_Score: 88, Assignment_Score: 95, Midterm_Score: 91, Practical_Score: 94, Final_Exam_Score: 91, Internal_Marks: 94.4, Total_Marks: 91.7, Grade: "A+", Result: "Pass" },
  { Student_ID: "STD-1049", Student_Name: "Tarun Rawat", Gender: "Male", Age: 19, Attendance_Percentage: 77, Study_Hours_Per_Day: 3.7, Previous_Score: 70, Assignment_Score: 77, Midterm_Score: 73, Practical_Score: 80, Final_Exam_Score: 72, Internal_Marks: 78.8, Total_Marks: 73.7, Grade: "B", Result: "Pass" },
  { Student_ID: "STD-1050", Student_Name: "Pallavi Das", Gender: "Female", Age: 20, Attendance_Percentage: 86, Study_Hours_Per_Day: 4.7, Previous_Score: 80, Assignment_Score: 86, Midterm_Score: 82, Practical_Score: 88, Final_Exam_Score: 83, Internal_Marks: 87.2, Total_Marks: 83.5, Grade: "A", Result: "Pass" },
  { Student_ID: "STD-1051", Student_Name: "Kunal Goswami", Gender: "Male", Age: 20, Attendance_Percentage: 59, Study_Hours_Per_Day: 1.7, Previous_Score: 49, Assignment_Score: 56, Midterm_Score: 50, Practical_Score: 61, Final_Exam_Score: 45, Internal_Marks: 59.0, Total_Marks: 49.3, Grade: "F", Result: "Fail" },
  { Student_ID: "STD-1052", Student_Name: "Esha Somani", Gender: "Female", Age: 19, Attendance_Percentage: 91, Study_Hours_Per_Day: 6.0, Previous_Score: 86, Assignment_Score: 92, Midterm_Score: 88, Practical_Score: 93, Final_Exam_Score: 89, Internal_Marks: 92.6, Total_Marks: 89.4, Grade: "A", Result: "Pass" },
  { Student_ID: "STD-1053", Student_Name: "Dinesh Murthy", Gender: "Male", Age: 21, Attendance_Percentage: 83, Study_Hours_Per_Day: 4.5, Previous_Score: 75, Assignment_Score: 83, Midterm_Score: 79, Practical_Score: 85, Final_Exam_Score: 78, Internal_Marks: 84.2, Total_Marks: 79.5, Grade: "B", Result: "Pass" },
  { Student_ID: "STD-1054", Student_Name: "Priyanka Roy", Gender: "Female", Age: 20, Attendance_Percentage: 96, Study_Hours_Per_Day: 7.3, Previous_Score: 94, Assignment_Score: 98, Midterm_Score: 95, Practical_Score: 97, Final_Exam_Score: 96, Internal_Marks: 97.4, Total_Marks: 96.0, Grade: "A+", Result: "Pass" },
  { Student_ID: "STD-1055", Student_Name: "Alok Pandey", Gender: "Male", Age: 19, Attendance_Percentage: 65, Study_Hours_Per_Day: 2.3, Previous_Score: 55, Assignment_Score: 63, Midterm_Score: 57, Practical_Score: 67, Final_Exam_Score: 54, Internal_Marks: 65.4, Total_Marks: 57.2, Grade: "D", Result: "Pass" },
  { Student_ID: "STD-1056", Student_Name: "Simran Kaur", Gender: "Female", Age: 20, Attendance_Percentage: 88, Study_Hours_Per_Day: 5.3, Previous_Score: 82, Assignment_Score: 88, Midterm_Score: 84, Practical_Score: 89, Final_Exam_Score: 85, Internal_Marks: 88.6, Total_Marks: 85.4, Grade: "A", Result: "Pass" },
  { Student_ID: "STD-1057", Student_Name: "Vinay Saxena", Gender: "Male", Age: 22, Attendance_Percentage: 71, Study_Hours_Per_Day: 3.1, Previous_Score: 64, Assignment_Score: 71, Midterm_Score: 66, Practical_Score: 75, Final_Exam_Score: 65, Internal_Marks: 73.4, Total_Marks: 67.0, Grade: "C", Result: "Pass" },
  { Student_ID: "STD-1058", Student_Name: "Geeta Kumari", Gender: "Female", Age: 19, Attendance_Percentage: 85, Study_Hours_Per_Day: 4.8, Previous_Score: 79, Assignment_Score: 85, Midterm_Score: 81, Practical_Score: 87, Final_Exam_Score: 82, Internal_Marks: 86.2, Total_Marks: 82.5, Grade: "A", Result: "Pass" },
  { Student_ID: "STD-1059", Student_Name: "Harish Pillai", Gender: "Male", Age: 20, Attendance_Percentage: 56, Study_Hours_Per_Day: 1.4, Previous_Score: 44, Assignment_Score: 51, Midterm_Score: 45, Practical_Score: 56, Final_Exam_Score: 40, Internal_Marks: 54.0, Total_Marks: 44.3, Grade: "F", Result: "Fail" },
  { Student_ID: "STD-1060", Student_Name: "Mona Agarwal", Gender: "Female", Age: 21, Attendance_Percentage: 92, Study_Hours_Per_Day: 6.3, Previous_Score: 87, Assignment_Score: 93, Midterm_Score: 90, Practical_Score: 94, Final_Exam_Score: 90, Internal_Marks: 93.6, Total_Marks: 90.7, Grade: "A+", Result: "Pass" },
  { Student_ID: "STD-1061", Student_Name: "Rakesh Yadav", Gender: "Male", Age: 20, Attendance_Percentage: 78, Study_Hours_Per_Day: 3.8, Previous_Score: 71, Assignment_Score: 78, Midterm_Score: 74, Practical_Score: 81, Final_Exam_Score: 73, Internal_Marks: 79.8, Total_Marks: 74.7, Grade: "B", Result: "Pass" },
  { Student_ID: "STD-1062", Student_Name: "Trisha Mukherjee", Gender: "Female", Age: 19, Attendance_Percentage: 89, Study_Hours_Per_Day: 5.6, Previous_Score: 84, Assignment_Score: 90, Midterm_Score: 86, Practical_Score: 91, Final_Exam_Score: 87, Internal_Marks: 90.6, Total_Marks: 87.4, Grade: "A", Result: "Pass" },
  { Student_ID: "STD-1063", Student_Name: "Ashish Nanda", Gender: "Male", Age: 20, Attendance_Percentage: 63, Study_Hours_Per_Day: 2.1, Previous_Score: 53, Assignment_Score: 61, Midterm_Score: 55, Practical_Score: 66, Final_Exam_Score: 51, Internal_Marks: 64.0, Total_Marks: 54.8, Grade: "D", Result: "Pass" },
  { Student_ID: "STD-1064", Student_Name: "Bhavana Sen", Gender: "Female", Age: 20, Attendance_Percentage: 95, Study_Hours_Per_Day: 6.9, Previous_Score: 91, Assignment_Score: 97, Midterm_Score: 94, Practical_Score: 96, Final_Exam_Score: 93, Internal_Marks: 96.4, Total_Marks: 94.0, Grade: "A+", Result: "Pass" },
  { Student_ID: "STD-1065", Student_Name: "Chirag Sethi", Gender: "Male", Age: 19, Attendance_Percentage: 81, Study_Hours_Per_Day: 4.2, Previous_Score: 73, Assignment_Score: 81, Midterm_Score: 77, Practical_Score: 83, Final_Exam_Score: 76, Internal_Marks: 82.2, Total_Marks: 77.5, Grade: "B", Result: "Pass" },
  { Student_ID: "STD-1066", Student_Name: "Deepa Menon", Gender: "Female", Age: 21, Attendance_Percentage: 87, Study_Hours_Per_Day: 4.9, Previous_Score: 80, Assignment_Score: 87, Midterm_Score: 83, Practical_Score: 88, Final_Exam_Score: 82, Internal_Marks: 87.6, Total_Marks: 83.4, Grade: "A", Result: "Pass" },
  { Student_ID: "STD-1067", Student_Name: "Hemant Dixit", Gender: "Male", Age: 20, Attendance_Percentage: 53, Study_Hours_Per_Day: 1.1, Previous_Score: 41, Assignment_Score: 49, Midterm_Score: 43, Practical_Score: 54, Final_Exam_Score: 37, Internal_Marks: 52.0, Total_Marks: 41.8, Grade: "F", Result: "Fail" },
  { Student_ID: "STD-1068", Student_Name: "Juhi Bansal", Gender: "Female", Age: 19, Attendance_Percentage: 93, Study_Hours_Per_Day: 6.6, Previous_Score: 89, Assignment_Score: 95, Midterm_Score: 92, Practical_Score: 95, Final_Exam_Score: 91, Internal_Marks: 95.0, Total_Marks: 92.1, Grade: "A+", Result: "Pass" },
  { Student_ID: "STD-1069", Student_Name: "Kishore Bhatt", Gender: "Male", Age: 20, Attendance_Percentage: 74, Study_Hours_Per_Day: 3.3, Previous_Score: 66, Assignment_Score: 73, Midterm_Score: 68, Practical_Score: 78, Final_Exam_Score: 66, Internal_Marks: 76.0, Total_Marks: 68.6, Grade: "C", Result: "Pass" },
  { Student_ID: "STD-1070", Student_Name: "Lata Krishnan", Gender: "Female", Age: 20, Attendance_Percentage: 86, Study_Hours_Per_Day: 4.7, Previous_Score: 78, Assignment_Score: 85, Midterm_Score: 81, Practical_Score: 87, Final_Exam_Score: 80, Internal_Marks: 86.2, Total_Marks: 81.5, Grade: "A", Result: "Pass" },
  { Student_ID: "STD-1071", Student_Name: "Mukesh Lal", Gender: "Male", Age: 22, Attendance_Percentage: 61, Study_Hours_Per_Day: 2.0, Previous_Score: 51, Assignment_Score: 59, Midterm_Score: 53, Practical_Score: 64, Final_Exam_Score: 49, Internal_Marks: 62.0, Total_Marks: 52.8, Grade: "D", Result: "Pass" },
  { Student_ID: "STD-1072", Student_Name: "Nandini Ghosh", Gender: "Female", Age: 19, Attendance_Percentage: 98, Study_Hours_Per_Day: 8.0, Previous_Score: 96, Assignment_Score: 100, Midterm_Score: 98, Practical_Score: 100, Final_Exam_Score: 99, Internal_Marks: 100.0, Total_Marks: 98.9, Grade: "A+", Result: "Pass" },
  { Student_ID: "STD-1073", Student_Name: "Omkar Nadkarni", Gender: "Male", Age: 20, Attendance_Percentage: 80, Study_Hours_Per_Day: 4.1, Previous_Score: 72, Assignment_Score: 79, Midterm_Score: 76, Practical_Score: 82, Final_Exam_Score: 74, Internal_Marks: 80.8, Total_Marks: 76.0, Grade: "B", Result: "Pass" },
  { Student_ID: "STD-1074", Student_Name: "Preeti Sahay", Gender: "Female", Age: 21, Attendance_Percentage: 90, Study_Hours_Per_Day: 5.8, Previous_Score: 85, Assignment_Score: 91, Midterm_Score: 87, Practical_Score: 92, Final_Exam_Score: 88, Internal_Marks: 91.6, Total_Marks: 88.4, Grade: "A", Result: "Pass" },
  { Student_ID: "STD-1075", Student_Name: "Qadir Khan", Gender: "Male", Age: 20, Attendance_Percentage: 72, Study_Hours_Per_Day: 3.0, Previous_Score: 63, Assignment_Score: 70, Midterm_Score: 65, Practical_Score: 74, Final_Exam_Score: 63, Internal_Marks: 72.4, Total_Marks: 65.5, Grade: "C", Result: "Pass" },
  { Student_ID: "STD-1076", Student_Name: "Rashmi Som", Gender: "Female", Age: 19, Attendance_Percentage: 85, Study_Hours_Per_Day: 4.6, Previous_Score: 78, Assignment_Score: 84, Midterm_Score: 80, Practical_Score: 86, Final_Exam_Score: 81, Internal_Marks: 85.2, Total_Marks: 81.5, Grade: "A", Result: "Pass" },
  { Student_ID: "STD-1077", Student_Name: "Sanjay Rao", Gender: "Male", Age: 21, Attendance_Percentage: 57, Study_Hours_Per_Day: 1.5, Previous_Score: 47, Assignment_Score: 54, Midterm_Score: 49, Practical_Score: 59, Final_Exam_Score: 43, Internal_Marks: 57.0, Total_Marks: 47.6, Grade: "F", Result: "Fail" },
  { Student_ID: "STD-1078", Student_Name: "Tanushree Das", Gender: "Female", Age: 20, Attendance_Percentage: 94, Study_Hours_Per_Day: 6.8, Previous_Score: 90, Assignment_Score: 96, Midterm_Score: 93, Practical_Score: 95, Final_Exam_Score: 92, Internal_Marks: 95.4, Total_Marks: 93.0, Grade: "A+", Result: "Pass" },
  { Student_ID: "STD-1079", Student_Name: "Uday Shankar", Gender: "Male", Age: 19, Attendance_Percentage: 83, Study_Hours_Per_Day: 4.4, Previous_Score: 75, Assignment_Score: 82, Midterm_Score: 78, Practical_Score: 84, Final_Exam_Score: 77, Internal_Marks: 83.2, Total_Marks: 78.5, Grade: "B", Result: "Pass" },
  { Student_ID: "STD-1080", Student_Name: "Vaishali Hegde", Gender: "Female", Age: 20, Attendance_Percentage: 88, Study_Hours_Per_Day: 5.2, Previous_Score: 81, Assignment_Score: 87, Midterm_Score: 83, Practical_Score: 89, Final_Exam_Score: 84, Internal_Marks: 88.2, Total_Marks: 84.6, Grade: "A", Result: "Pass" },
  { Student_ID: "STD-1081", Student_Name: "Waseem Akram", Gender: "Male", Age: 20, Attendance_Percentage: 66, Study_Hours_Per_Day: 2.4, Previous_Score: 57, Assignment_Score: 64, Midterm_Score: 59, Practical_Score: 69, Final_Exam_Score: 56, Internal_Marks: 67.0, Total_Marks: 59.1, Grade: "D", Result: "Pass" },
  { Student_ID: "STD-1082", Student_Name: "Yamini Reddy", Gender: "Female", Age: 19, Attendance_Percentage: 92, Study_Hours_Per_Day: 6.4, Previous_Score: 87, Assignment_Score: 93, Midterm_Score: 89, Practical_Score: 93, Final_Exam_Score: 90, Internal_Marks: 93.0, Total_Marks: 90.3, Grade: "A+", Result: "Pass" },
  { Student_ID: "STD-1083", Student_Name: "Zaid Shaikh", Gender: "Male", Age: 21, Attendance_Percentage: 77, Study_Hours_Per_Day: 3.6, Previous_Score: 69, Assignment_Score: 76, Midterm_Score: 72, Practical_Score: 79, Final_Exam_Score: 71, Internal_Marks: 77.8, Total_Marks: 72.7, Grade: "B", Result: "Pass" },
  { Student_ID: "STD-1084", Student_Name: "Arundhati Roy", Gender: "Female", Age: 20, Attendance_Percentage: 95, Study_Hours_Per_Day: 7.0, Previous_Score: 92, Assignment_Score: 98, Midterm_Score: 95, Practical_Score: 97, Final_Exam_Score: 95, Internal_Marks: 97.4, Total_Marks: 95.5, Grade: "A+", Result: "Pass" },
  { Student_ID: "STD-1085", Student_Name: "Bharat Rawat", Gender: "Male", Age: 20, Attendance_Percentage: 51, Study_Hours_Per_Day: 1.0, Previous_Score: 41, Assignment_Score: 47, Midterm_Score: 43, Practical_Score: 53, Final_Exam_Score: 37, Internal_Marks: 50.6, Total_Marks: 41.5, Grade: "F", Result: "Fail" },
  { Student_ID: "STD-1086", Student_Name: "Charu Sharma", Gender: "Female", Age: 19, Attendance_Percentage: 89, Study_Hours_Per_Day: 5.5, Previous_Score: 83, Assignment_Score: 89, Midterm_Score: 85, Practical_Score: 90, Final_Exam_Score: 86, Internal_Marks: 89.6, Total_Marks: 86.4, Grade: "A", Result: "Pass" },
  { Student_ID: "STD-1087", Student_Name: "Devendra Soni", Gender: "Male", Age: 22, Attendance_Percentage: 79, Study_Hours_Per_Day: 3.9, Previous_Score: 71, Assignment_Score: 78, Midterm_Score: 75, Practical_Score: 81, Final_Exam_Score: 74, Internal_Marks: 79.8, Total_Marks: 75.5, Grade: "B", Result: "Pass" },
  { Student_ID: "STD-1088", Student_Name: "Ekta Kapoor", Gender: "Female", Age: 20, Attendance_Percentage: 84, Study_Hours_Per_Day: 4.3, Previous_Score: 76, Assignment_Score: 83, Midterm_Score: 79, Practical_Score: 85, Final_Exam_Score: 78, Internal_Marks: 84.2, Total_Marks: 79.5, Grade: "B", Result: "Pass" },
  { Student_ID: "STD-1089", Student_Name: "Firoz Ahmed", Gender: "Male", Age: 20, Attendance_Percentage: 68, Study_Hours_Per_Day: 2.6, Previous_Score: 58, Assignment_Score: 65, Midterm_Score: 60, Practical_Score: 70, Final_Exam_Score: 57, Internal_Marks: 68.0, Total_Marks: 60.1, Grade: "C", Result: "Pass" },
  { Student_ID: "STD-1090", Student_Name: "Garima Seth", Gender: "Female", Age: 19, Attendance_Percentage: 93, Study_Hours_Per_Day: 6.7, Previous_Score: 89, Assignment_Score: 95, Midterm_Score: 92, Practical_Score: 94, Final_Exam_Score: 92, Internal_Marks: 94.4, Total_Marks: 92.5, Grade: "A+", Result: "Pass" },
  { Student_ID: "STD-1091", Student_Name: "Hitesh Joshi", Gender: "Male", Age: 21, Attendance_Percentage: 82, Study_Hours_Per_Day: 4.2, Previous_Score: 74, Assignment_Score: 81, Midterm_Score: 77, Practical_Score: 83, Final_Exam_Score: 75, Internal_Marks: 82.2, Total_Marks: 77.0, Grade: "B", Result: "Pass" },
  { Student_ID: "STD-1092", Student_Name: "Indira Nair", Gender: "Female", Age: 20, Attendance_Percentage: 87, Study_Hours_Per_Day: 5.1, Previous_Score: 80, Assignment_Score: 87, Midterm_Score: 83, Practical_Score: 88, Final_Exam_Score: 84, Internal_Marks: 87.6, Total_Marks: 84.4, Grade: "A", Result: "Pass" },
  { Student_ID: "STD-1093", Student_Name: "Jagdish Prasad", Gender: "Male", Age: 22, Attendance_Percentage: 58, Study_Hours_Per_Day: 1.7, Previous_Score: 48, Assignment_Score: 55, Midterm_Score: 49, Practical_Score: 59, Final_Exam_Score: 44, Internal_Marks: 57.4, Total_Marks: 48.2, Grade: "F", Result: "Fail" },
  { Student_ID: "STD-1094", Student_Name: "Komal Varma", Gender: "Female", Age: 19, Attendance_Percentage: 91, Study_Hours_Per_Day: 6.1, Previous_Score: 86, Assignment_Score: 93, Midterm_Score: 89, Practical_Score: 92, Final_Exam_Score: 89, Internal_Marks: 92.4, Total_Marks: 89.7, Grade: "A", Result: "Pass" },
  { Student_ID: "STD-1095", Student_Name: "Lokesh Yadav", Gender: "Male", Age: 20, Attendance_Percentage: 75, Study_Hours_Per_Day: 3.5, Previous_Score: 67, Assignment_Score: 74, Midterm_Score: 70, Practical_Score: 78, Final_Exam_Score: 69, Internal_Marks: 76.4, Total_Marks: 70.8, Grade: "B", Result: "Pass" },
  { Student_ID: "STD-1096", Student_Name: "Madhuri Dixit", Gender: "Female", Age: 20, Attendance_Percentage: 97, Study_Hours_Per_Day: 7.4, Previous_Score: 94, Assignment_Score: 99, Midterm_Score: 96, Practical_Score: 98, Final_Exam_Score: 97, Internal_Marks: 98.4, Total_Marks: 97.0, Grade: "A+", Result: "Pass" },
  { Student_ID: "STD-1097", Student_Name: "Nilesh Patel", Gender: "Male", Age: 21, Attendance_Percentage: 64, Study_Hours_Per_Day: 2.2, Previous_Score: 54, Assignment_Score: 62, Midterm_Score: 56, Practical_Score: 67, Final_Exam_Score: 53, Internal_Marks: 65.0, Total_Marks: 56.3, Grade: "D", Result: "Pass" },
  { Student_ID: "STD-1098", Student_Name: "Ojaswini Rao", Gender: "Female", Age: 19, Attendance_Percentage: 86, Study_Hours_Per_Day: 4.7, Previous_Score: 79, Assignment_Score: 86, Midterm_Score: 82, Practical_Score: 87, Final_Exam_Score: 82, Internal_Marks: 86.6, Total_Marks: 82.9, Grade: "A", Result: "Pass" },
  { Student_ID: "STD-1099", Student_Name: "Pankaj Tripathi", Gender: "Male", Age: 22, Attendance_Percentage: 76, Study_Hours_Per_Day: 3.6, Previous_Score: 68, Assignment_Score: 75, Midterm_Score: 71, Practical_Score: 79, Final_Exam_Score: 70, Internal_Marks: 77.4, Total_Marks: 71.8, Grade: "B", Result: "Pass" },
  { Student_ID: "STD-1100", Student_Name: "Rani Mukherjee", Gender: "Female", Age: 20, Attendance_Percentage: 94, Study_Hours_Per_Day: 6.9, Previous_Score: 91, Assignment_Score: 97, Midterm_Score: 93, Practical_Score: 96, Final_Exam_Score: 94, Internal_Marks: 96.4, Total_Marks: 94.2, Grade: "A+", Result: "Pass" },
  { Student_ID: "STD-1101", Student_Name: "Sachin Tendulkar", Gender: "Male", Age: 20, Attendance_Percentage: 88, Study_Hours_Per_Day: 5.3, Previous_Score: 82, Assignment_Score: 88, Midterm_Score: 84, Practical_Score: 89, Final_Exam_Score: 85, Internal_Marks: 88.6, Total_Marks: 85.3, Grade: "A", Result: "Pass" },
  { Student_ID: "STD-1102", Student_Name: "Tulsi Kumar", Gender: "Female", Age: 19, Attendance_Percentage: 81, Study_Hours_Per_Day: 4.0, Previous_Score: 73, Assignment_Score: 80, Midterm_Score: 76, Practical_Score: 82, Final_Exam_Score: 75, Internal_Marks: 81.2, Total_Marks: 76.5, Grade: "B", Result: "Pass" },
  { Student_ID: "STD-1103", Student_Name: "Utkarsh Mishra", Gender: "Male", Age: 21, Attendance_Percentage: 54, Study_Hours_Per_Day: 1.3, Previous_Score: 43, Assignment_Score: 50, Midterm_Score: 46, Practical_Score: 55, Final_Exam_Score: 39, Internal_Marks: 53.0, Total_Marks: 43.9, Grade: "F", Result: "Fail" },
  { Student_ID: "STD-1104", Student_Name: "Vandana Shiva", Gender: "Female", Age: 20, Attendance_Percentage: 92, Study_Hours_Per_Day: 6.3, Previous_Score: 87, Assignment_Score: 94, Midterm_Score: 90, Practical_Score: 93, Final_Exam_Score: 91, Internal_Marks: 93.4, Total_Marks: 91.2, Grade: "A+", Result: "Pass" },
  { Student_ID: "STD-1105", Student_Name: "Wasim Jaffer", Gender: "Male", Age: 20, Attendance_Percentage: 70, Study_Hours_Per_Day: 3.0, Previous_Score: 62, Assignment_Score: 69, Midterm_Score: 64, Practical_Score: 73, Final_Exam_Score: 63, Internal_Marks: 71.4, Total_Marks: 65.0, Grade: "C", Result: "Pass" },
  { Student_ID: "STD-1106", Student_Name: "Yuvraj Singh", Gender: "Male", Age: 21, Attendance_Percentage: 85, Study_Hours_Per_Day: 4.8, Previous_Score: 78, Assignment_Score: 85, Midterm_Score: 81, Practical_Score: 86, Final_Exam_Score: 82, Internal_Marks: 85.6, Total_Marks: 82.4, Grade: "A", Result: "Pass" },
  { Student_ID: "STD-1107", Student_Name: "Zeenat Aman", Gender: "Female", Age: 20, Attendance_Percentage: 90, Study_Hours_Per_Day: 5.9, Previous_Score: 85, Assignment_Score: 92, Midterm_Score: 88, Practical_Score: 92, Final_Exam_Score: 88, Internal_Marks: 92.0, Total_Marks: 88.8, Grade: "A", Result: "Pass" },
  { Student_ID: "STD-1108", Student_Name: "Abhay Deol", Gender: "Male", Age: 19, Attendance_Percentage: 65, Study_Hours_Per_Day: 2.3, Previous_Score: 55, Assignment_Score: 62, Midterm_Score: 57, Practical_Score: 68, Final_Exam_Score: 54, Internal_Marks: 65.6, Total_Marks: 57.2, Grade: "D", Result: "Pass" },
  { Student_ID: "STD-1109", Student_Name: "Bindu Madhavi", Gender: "Female", Age: 20, Attendance_Percentage: 95, Study_Hours_Per_Day: 7.1, Previous_Score: 92, Assignment_Score: 98, Midterm_Score: 94, Practical_Score: 97, Final_Exam_Score: 95, Internal_Marks: 97.4, Total_Marks: 95.2, Grade: "A+", Result: "Pass" },
  { Student_ID: "STD-1110", Student_Name: "Chetan Bhagat", Gender: "Male", Age: 22, Attendance_Percentage: 78, Study_Hours_Per_Day: 3.7, Previous_Score: 70, Assignment_Score: 77, Midterm_Score: 73, Practical_Score: 80, Final_Exam_Score: 72, Internal_Marks: 78.8, Total_Marks: 73.7, Grade: "B", Result: "Pass" }
];

export function getDatasetSummary(records: StudentRecord[] = RAW_STUDENT_DATA): DatasetSummary {
  const total = records.length;
  if (total === 0) {
    return {
      totalStudents: 0,
      averageTotalMarks: 0,
      highestMarks: 0,
      lowestMarks: 0,
      averageAttendance: 0,
      averageStudyHours: 0,
      averageFinalExam: 0,
      averageMidterm: 0,
      averageAssignment: 0,
      averagePractical: 0,
      averageInternal: 0,
      passCount: 0,
      failCount: 0,
      passPercentage: 0,
      failPercentage: 0,
      gradeCounts: {},
      maleCount: 0,
      femaleCount: 0,
    };
  }

  let totalMarksSum = 0;
  let attendanceSum = 0;
  let studyHoursSum = 0;
  let finalExamSum = 0;
  let midtermSum = 0;
  let assignmentSum = 0;
  let practicalSum = 0;
  let internalSum = 0;
  let passCount = 0;
  let maleCount = 0;
  let femaleCount = 0;
  let highestMarks = -Infinity;
  let lowestMarks = Infinity;

  const gradeCounts: Record<string, number> = {
    'A+': 0,
    'A': 0,
    'B': 0,
    'C': 0,
    'D': 0,
    'F': 0,
  };

  records.forEach((rec) => {
    totalMarksSum += rec.Total_Marks;
    attendanceSum += rec.Attendance_Percentage;
    studyHoursSum += rec.Study_Hours_Per_Day;
    finalExamSum += rec.Final_Exam_Score;
    midtermSum += rec.Midterm_Score;
    assignmentSum += rec.Assignment_Score;
    practicalSum += rec.Practical_Score;
    internalSum += rec.Internal_Marks;

    if (rec.Total_Marks > highestMarks) highestMarks = rec.Total_Marks;
    if (rec.Total_Marks < lowestMarks) lowestMarks = rec.Total_Marks;

    if (rec.Result === 'Pass') passCount++;
    if (rec.Gender === 'Male') maleCount++;
    if (rec.Gender === 'Female') femaleCount++;

    if (gradeCounts[rec.Grade] !== undefined) {
      gradeCounts[rec.Grade]++;
    } else {
      gradeCounts[rec.Grade] = 1;
    }
  });

  const failCount = total - passCount;

  return {
    totalStudents: total,
    averageTotalMarks: Number((totalMarksSum / total).toFixed(2)),
    highestMarks: Number(highestMarks.toFixed(2)),
    lowestMarks: Number(lowestMarks.toFixed(2)),
    averageAttendance: Number((attendanceSum / total).toFixed(2)),
    averageStudyHours: Number((studyHoursSum / total).toFixed(2)),
    averageFinalExam: Number((finalExamSum / total).toFixed(2)),
    averageMidterm: Number((midtermSum / total).toFixed(2)),
    averageAssignment: Number((assignmentSum / total).toFixed(2)),
    averagePractical: Number((practicalSum / total).toFixed(2)),
    averageInternal: Number((internalSum / total).toFixed(2)),
    passCount,
    failCount,
    passPercentage: Number(((passCount / total) * 100).toFixed(2)),
    failPercentage: Number(((failCount / total) * 100).toFixed(2)),
    gradeCounts,
    maleCount,
    femaleCount,
  };
}

export const SAMPLE_STUDENTS = RAW_STUDENT_DATA;
export const calculateDatasetSummary = getDatasetSummary;

export function convertToCsv(records: StudentRecord[] = RAW_STUDENT_DATA): string {
  const headers = [
    "Student_ID",
    "Student_Name",
    "Gender",
    "Age",
    "Attendance_Percentage",
    "Study_Hours_Per_Day",
    "Previous_Score",
    "Assignment_Score",
    "Midterm_Score",
    "Final_Exam_Score",
    "Practical_Score",
    "Internal_Marks",
    "Total_Marks",
    "Grade",
    "Result"
  ];

  const rows = records.map(r => [
    r.Student_ID,
    `"${r.Student_Name}"`,
    r.Gender,
    r.Age,
    r.Attendance_Percentage,
    r.Study_Hours_Per_Day,
    r.Previous_Score,
    r.Assignment_Score,
    r.Midterm_Score,
    r.Final_Exam_Score,
    r.Practical_Score,
    r.Internal_Marks,
    r.Total_Marks,
    r.Grade,
    r.Result
  ].join(","));

  return [headers.join(","), ...rows].join("\n");
}
