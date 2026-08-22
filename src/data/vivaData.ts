import { VivaQuestion } from '../types';

export const VIVA_QUESTIONS: VivaQuestion[] = [
  {
    id: 1,
    category: "General & Project",
    question: "What is the primary objective of this project?",
    shortAnswer: "To store, clean, analyze student academic records, visualize key trends, and predict final performance using a Linear Regression model to provide early academic counseling.",
    detailedAnswer: "The objective is to build an end-to-end beginner-friendly decision support tool for educational institutions. It cleans academic data, analyzes descriptive statistics (like averages, pass rates, grade distributions), plots visual trends using Matplotlib, predicts final exam scores using Scikit-Learn Linear Regression, and generates tailored study recommendations.",
    keyKeywords: ["Data Cleaning", "Descriptive Analysis", "Linear Regression", "Early Counseling", "Streamlit UI"],
    difficulty: "Easy"
  },
  {
    id: 2,
    category: "General & Project",
    question: "Why did you select this topic for your college minor project?",
    shortAnswer: "Because student academic failure is often detected too late. Predicting performance early allows teachers and mentors to intervene before final exams.",
    detailedAnswer: "In traditional educational systems, students often receive feedback only after end-semester exams when it is too late to recover. This project addresses that problem by tracking ongoing indicators (attendance, daily study hours, assignments, midterm exams) to predict final outcomes ahead of time and recommend actionable improvements.",
    keyKeywords: ["Early Intervention", "Proactive Advising", "Academic Retention", "Continuous Evaluation"],
    difficulty: "Easy"
  },
  {
    id: 3,
    category: "Python & Libraries",
    question: "Why did you choose Python for developing this project?",
    shortAnswer: "Python is simple, readable, beginner-friendly, and has the richest ecosystem of data science and machine learning libraries like Pandas, NumPy, Scikit-learn, and Matplotlib.",
    detailedAnswer: "Python provides clean syntax, fast development cycles, and standard industry-grade data science packages. Its rich library ecosystem allows seamless end-to-end pipelines—from data cleaning with Pandas to machine learning with Scikit-learn and web deployment with Streamlit—all within a single language.",
    keyKeywords: ["Simplicity", "Rich Data Science Ecosystem", "Fast Prototyping", "Readability"],
    difficulty: "Easy"
  },
  {
    id: 4,
    category: "Python & Libraries",
    question: "What is Pandas and what role does it play in this system?",
    shortAnswer: "Pandas is a Python library for tabular data manipulation. In our project, it loads CSV files into DataFrames, cleans null values, removes duplicates, filters cohorts, and computes summary statistics.",
    detailedAnswer: "Pandas introduces DataFrame structures that allow high-level operations like `read_csv()`, `.fillna()`, `.drop_duplicates()`, `.groupby()`, and descriptive summaries (`.mean()`, `.max()`, `.describe()`). It serves as the primary data processing engine in our project.",
    keyKeywords: ["DataFrame", "read_csv()", "fillna()", "drop_duplicates()", "Data Wrangling"],
    difficulty: "Easy"
  },
  {
    id: 5,
    category: "Python & Libraries",
    question: "What is NumPy and how is it used?",
    shortAnswer: "NumPy (Numerical Python) is a library for fast array and matrix computations. It is used for statistical operations, square root calculations (like RMSE), and array transformations.",
    detailedAnswer: "NumPy provides multidimensional array objects and optimized C-speed mathematical routines. We use NumPy for calculating Root Mean Squared Error (`np.sqrt(mse)`), linear trendlines with `np.polyfit()`, and numeric data type validations.",
    keyKeywords: ["Numerical Python", "Array Operations", "np.sqrt()", "Matrix Computations"],
    difficulty: "Easy"
  },
  {
    id: 6,
    category: "Python & Libraries",
    question: "What is Matplotlib and what charts did you generate?",
    shortAnswer: "Matplotlib is a 2D plotting library. We generated 7 charts: subject averages bar chart, pass/fail pie chart, grade distribution bar chart, study hours scatter plot, attendance scatter plot, score histogram, and top 10 students bar chart.",
    detailedAnswer: "Matplotlib's `pyplot` module enables custom visualization of educational trends. Each chart includes titles, labeled X/Y axes, custom color palettes, grid lines, and trendlines so teachers can quickly digest classroom performance at a glance.",
    keyKeywords: ["pyplot", "Bar Chart", "Scatter Plot", "Pie Chart", "Histogram", "Trendline"],
    difficulty: "Easy"
  },
  {
    id: 7,
    category: "Python & Libraries",
    question: "What is Scikit-learn?",
    shortAnswer: "Scikit-learn is a standard Python machine learning library used for data splitting (train_test_split), model training (LinearRegression), and performance evaluation (MAE, MSE, R²).",
    detailedAnswer: "Scikit-learn provides robust, well-documented algorithms for supervised and unsupervised learning. In this project, we utilize `sklearn.linear_model.LinearRegression`, `sklearn.model_selection.train_test_split`, and metric functions from `sklearn.metrics`.",
    keyKeywords: ["LinearRegression", "train_test_split", "mean_absolute_error", "r2_score"],
    difficulty: "Easy"
  },
  {
    id: 8,
    category: "Python & Libraries",
    question: "What is Streamlit and why was it chosen over Django or Flask?",
    shortAnswer: "Streamlit is a modern Python framework for turning data scripts into interactive web apps in pure Python without writing HTML, CSS, or JavaScript.",
    detailedAnswer: "Unlike heavy full-stack frameworks like Django or Flask that require template routing, REST APIs, and front-end boilerplate, Streamlit allows creating rich interactive sliders, tables, metrics, and chart renders directly from Python code in just a few lines. This makes it ideal for student minor projects.",
    keyKeywords: ["Pure Python Web App", "Rapid Prototyping", "st.metric", "st.pyplot", "No HTML/JS Required"],
    difficulty: "Medium"
  },
  {
    id: 9,
    category: "Data Cleaning & EDA",
    question: "What is data preprocessing and data cleaning? Why is it mandatory?",
    shortAnswer: "Data cleaning is the process of fixing incomplete, incorrect, or duplicate data. It is mandatory because 'garbage in means garbage out'—poor data leads to unreliable ML models.",
    detailedAnswer: "Raw real-world datasets often contain missing entries (NaNs), duplicates, out-of-range values, and type mismatches. In our project, we verify null values using `.isnull().sum()`, impute missing numeric values with the column median (`.fillna(df.median())`), and remove redundant rows with `.drop_duplicates()` to guarantee data integrity.",
    keyKeywords: ["Garbage In Garbage Out", "Null Handling", "Median Imputation", "Deduplication"],
    difficulty: "Important"
  },
  {
    id: 10,
    category: "Data Cleaning & EDA",
    question: "How did you design the student performance dataset?",
    shortAnswer: "The dataset has 100+ records with 15 columns. Total_Marks, Grade, and Result are logically computed from internal, midterm, and final scores rather than randomly entered.",
    detailedAnswer: "The dataset includes demographic factors (ID, Name, Gender, Age), behavioral inputs (Attendance %, Daily Study Hours), continuous assessment marks (Previous Score, Assignment, Practical, Midterm, Internal Marks), and calculated targets (Final Exam, Total Marks, Grade, Result) ensuring internal consistency.",
    keyKeywords: ["100+ Records", "15 Columns", "Logical Consistency", "Continuous Assessment"],
    difficulty: "Medium"
  },
  {
    id: 11,
    category: "Data Cleaning & EDA",
    question: "How is Total_Marks and Grade calculated in your system?",
    shortAnswer: "Internal marks combine 40% assignment and 60% practical. Total marks combine 20% internal, 30% midterm, and 50% final exam. Grades follow standard university rules: A+ (>=90), A (80-89), B (70-79), C (60-69), D (50-59), F (<50).",
    detailedAnswer: "We use weighted normalization: Internal Marks = 0.4 * Assignment + 0.6 * Practical. Total Marks = 0.2 * Internal + 0.3 * Midterm + 0.5 * Final Exam. A student passes only if Total Marks >= 50, Attendance >= 60%, and Final Exam >= 40.",
    keyKeywords: ["Weighted Formula", "Internal Marks", "Grade Boundary", "Passing Criteria"],
    difficulty: "Medium"
  },
  {
    id: 12,
    category: "Machine Learning",
    question: "What is Machine Learning and what type of learning is used here?",
    shortAnswer: "Machine Learning allows computers to learn patterns from data without being explicitly hardcoded. This project uses Supervised Learning (Regression).",
    detailedAnswer: "Supervised Learning involves training an algorithm on labeled data (where both input features X and output targets y are known). Since our target (Final Exam Score) is a continuous numeric value between 0 and 100, it is a Regression task.",
    keyKeywords: ["Supervised Learning", "Regression Task", "Labeled Dataset", "Continuous Target"],
    difficulty: "Important"
  },
  {
    id: 13,
    category: "Machine Learning",
    question: "What is Linear Regression and what is its mathematical formula?",
    shortAnswer: "Linear Regression models the linear relationship between independent features X and a dependent target y. The formula is: y = β0 + β1*X1 + β2*X2 + ... + βn*Xn.",
    detailedAnswer: "Linear Regression finds the optimal hyperplane (or line of best fit) that minimizes the sum of squared differences between actual and predicted points (Ordinary Least Squares). β0 is the intercept, and β1 through βn represent the learned weights (slopes) of each feature.",
    keyKeywords: ["Line of Best Fit", "y = β0 + Σ βi Xi", "Ordinary Least Squares", "Feature Weights"],
    difficulty: "Important"
  },
  {
    id: 14,
    category: "Machine Learning",
    question: "Why did you select Linear Regression instead of a complex Deep Learning model?",
    shortAnswer: "Linear Regression is simple, highly interpretable, fast to train on small-to-medium academic datasets, and avoids the black-box opacity of deep neural networks.",
    detailedAnswer: "For educational counseling, interpretability is crucial. With Linear Regression, teachers can clearly see the exact coefficient weight of each factor (e.g., each extra study hour adds ~1.5 marks). Complex deep learning models require massive datasets, heavy computation, and cannot be easily explained in a minor project viva.",
    keyKeywords: ["Interpretability", "Transparency", "No Black-Box", "Appropriate Model Complexity"],
    difficulty: "Important"
  },
  {
    id: 15,
    category: "Machine Learning",
    question: "What is Training Data and what is Testing Data? Why split them 80/20?",
    shortAnswer: "Training data (80%) is used by the model to learn coefficients. Testing data (20%) is kept separate to evaluate how well the model predicts on unseen real-world students.",
    detailedAnswer: "If we evaluate a model on the same data it was trained on, we cannot tell if it genuinely generalized or merely memorized the samples. An 80/20 split provides sufficient samples (80+ records) for stable weight learning while reserving 20+ records for unbiased validation.",
    keyKeywords: ["80/20 Train-Test Split", "Generalization", "Unseen Data", "Unbiased Evaluation"],
    difficulty: "Important"
  },
  {
    id: 16,
    category: "Machine Learning",
    question: "What are the Independent and Dependent variables in this project?",
    shortAnswer: "Independent variables (X): Attendance %, Study Hours, Previous Score, Assignment, Midterm, Practical, and Internal Marks. Dependent variable (y): Final Exam Score.",
    detailedAnswer: "Independent variables (features) are the known input factors that influence student achievement. The dependent variable (target) is the outcome we want to predict (Final Exam Score).",
    keyKeywords: ["Independent Features (X)", "Dependent Target (y)", "Predictor Variables"],
    difficulty: "Easy"
  },
  {
    id: 17,
    category: "Machine Learning",
    question: "What is Overfitting and Underfitting? Does your model overfit?",
    shortAnswer: "Overfitting is when a model memorizes training noise and fails on new data. Underfitting is when a model is too simple to capture patterns. Our model has balanced metrics (high R² on both train and test) with no sign of overfitting.",
    detailedAnswer: "Because Linear Regression has low variance and high bias compared to complex polynomial or tree ensembles, it naturally resists overfitting on clean linear academic data. Our consistent MAE and MSE across train and test sets confirm generalizability.",
    keyKeywords: ["Overfitting vs Underfitting", "Generalization", "Variance vs Bias", "Stable Metrics"],
    difficulty: "Medium"
  },
  {
    id: 18,
    category: "Machine Learning",
    question: "What is Data Leakage and how did you prevent it?",
    shortAnswer: "Data leakage happens when information from the test dataset or target variable is inadvertently shared with the training set. We prevented it by splitting before model fitting and using separate feature columns.",
    detailedAnswer: "We ensured target features (like Total_Marks or Final_Exam_Score) are never included in the input feature matrix X. Furthermore, train-test splitting is conducted strictly prior to fitting the Scikit-learn estimator.",
    keyKeywords: ["Target Leakage Prevention", "Strict Train-Test Isolation", "Feature Isolation"],
    difficulty: "Important"
  },
  {
    id: 19,
    category: "Model Evaluation",
    question: "What is Mean Absolute Error (MAE)?",
    shortAnswer: "MAE is the average of absolute differences between actual scores and predicted scores. Formula: MAE = (1/n) * Σ |y_actual - y_pred|.",
    detailedAnswer: "MAE tells us in original score units (marks) how far off our predictions are on average. For example, an MAE of 1.8 means our model's predictions are on average within 1.8 marks of the true final exam score.",
    keyKeywords: ["Average Absolute Error", "Original Units", "|y - y_pred|", "Intuitive Metric"],
    difficulty: "Important"
  },
  {
    id: 20,
    category: "Model Evaluation",
    question: "What is Mean Squared Error (MSE) and Root Mean Squared Error (RMSE)?",
    shortAnswer: "MSE is the average of squared errors: (1/n) * Σ (y - y_pred)². RMSE is the square root of MSE. It penalizes large outlier mistakes more severely than MAE.",
    detailedAnswer: "Squaring errors prevents positive and negative errors from canceling each other out and disproportionately penalizes large prediction mistakes. RMSE brings the unit back to marks for easy comparison with MAE.",
    keyKeywords: ["Squared Errors", "Outlier Penalty", "np.sqrt(MSE)", "Scale Alignment"],
    difficulty: "Important"
  },
  {
    id: 21,
    category: "Model Evaluation",
    question: "What is the R² Score (Coefficient of Determination)?",
    shortAnswer: "R² measures the proportion of variance in the final exam score that is predictable from the input study features. A score close to 1.0 indicates an excellent fit.",
    detailedAnswer: "Formula: R² = 1 - (SS_res / SS_tot). An R² of 0.94 means that 94% of the variation in final student performance is directly explained by attendance, study hours, previous scores, and continuous assessments.",
    keyKeywords: ["Coefficient of Determination", "1 - (SS_res / SS_tot)", "Explained Variance", "Scale 0 to 1"],
    difficulty: "Important"
  },
  {
    id: 22,
    category: "Machine Learning",
    question: "How are students classified after their score is predicted?",
    shortAnswer: "Predicted scores are mapped into four clearly defined tiers: Excellent (90–100), Good (75–89), Average (50–74), and Needs Improvement (Below 50).",
    detailedAnswer: "This discrete categorization translates raw predicted numbers into actionable academic tiers so academic coordinators and advisors can prioritize students requiring remedial classes or mentorship.",
    keyKeywords: ["4 Tiers", "Excellent", "Good", "Average", "Needs Improvement"],
    difficulty: "Easy"
  },
  {
    id: 23,
    category: "Machine Learning",
    question: "How are the personalized academic recommendations generated?",
    shortAnswer: "Rule-based logic checks individual input parameters (e.g. attendance < 75%, study hours < 4 hrs/day, midterm < 60) and outputs specific corrective advice.",
    detailedAnswer: "The system inspects each feature: if attendance is below 75%, it alerts about university eligibility rules; if daily study hours are under 4 hours, it recommends increasing study time; if midterm marks are low, it prescribes unit-level revision.",
    keyKeywords: ["Rule-Based Advising", "Threshold Triggers", "Corrective Action", "Attendance Warning"],
    difficulty: "Medium"
  },
  {
    id: 24,
    category: "Viva Defense & Tips",
    question: "What happens step-by-step when the user clicks 'Predict Performance' in Streamlit?",
    shortAnswer: "Streamlit collects values from sliders, constructs a single-row DataFrame with 7 features, passes it to model.predict(), clips output between 0-100, maps the tier, and displays metrics with recommendations.",
    detailedAnswer: "1. Values are captured from `st.slider` widgets. 2. A DataFrame with matching feature column names is built. 3. `model.predict(input_data)` computes the dot product with weights plus intercept. 4. Output is categorized into Excellent/Good/Average/Needs Improvement. 5. Recommendations are generated and rendered using `st.metric` and `st.info`.",
    keyKeywords: ["Form Submission", "Feature Alignment", "model.predict()", "Rendering Widgets"],
    difficulty: "Important"
  },
  {
    id: 25,
    category: "Viva Defense & Tips",
    question: "What are the limitations of your project?",
    shortAnswer: "1. Dataset size is modest (110 records). 2. Assumes linear relationships. 3. Does not capture non-academic factors like health, family background, or mental stress.",
    detailedAnswer: "While Linear Regression is accurate for regular academic factors, real student success can be influenced by sudden health issues, family emergencies, or exam anxiety that are not captured in attendance and marks data.",
    keyKeywords: ["Dataset Scale", "Linearity Assumption", "Unrecorded External Factors"],
    difficulty: "Medium"
  },
  {
    id: 26,
    category: "Viva Defense & Tips",
    question: "What is the future scope of this project?",
    shortAnswer: "1. Compare with Random Forest and Decision Trees. 2. Connect to College ERP databases via SQL. 3. Automated SMS/Email alerts to parents. 4. PDF report generation.",
    detailedAnswer: "Future enhancements include integrating multi-semester tracking, cloud-hosted relational databases (PostgreSQL), sentiment analysis from teacher feedback, and automated email notifications for students under the 75% attendance threshold.",
    keyKeywords: ["Ensemble Models", "ERP Integration", "Automated SMS/Email", "PDF Export"],
    difficulty: "Easy"
  },
  {
    id: 27,
    category: "Data Cleaning & EDA",
    question: "What insights did your Exploratory Data Analysis (EDA) reveal?",
    shortAnswer: "1. Strong positive correlation between Daily Study Hours and Final Marks. 2. Clear link between Attendance (>75%) and passing. 3. Midterm scores are strong intermediate predictors.",
    detailedAnswer: "EDA proved that students studying more than 5 hours per day consistently scored in the top tier (>85 marks). Furthermore, 100% of the students who failed had attendance under 60%, highlighting attendance as a critical prerequisite for exam success.",
    keyKeywords: ["Positive Correlation", "Study Hours Impact", "Attendance Prerequisite", "Midterm Indicator"],
    difficulty: "Medium"
  },
  {
    id: 28,
    category: "Viva Defense & Tips",
    question: "How do you explain the Linear Regression weights (coefficients) to non-technical teachers?",
    shortAnswer: "Each weight represents how much the final score increases when that specific factor increases by 1 unit, keeping all other factors constant.",
    detailedAnswer: "For example, if the coefficient for `Study_Hours_Per_Day` is +1.45, it means that for every additional hour of self-study each day, the student's expected final score improves by approximately 1.45 marks.",
    keyKeywords: ["Unit Increase", "Slope Interpretation", "Feature Impact", "Ceteris Paribus"],
    difficulty: "Important"
  },
  {
    id: 29,
    category: "Python & Libraries",
    question: "What is the difference between a CSV file and a SQL Database in this context?",
    shortAnswer: "A CSV is a lightweight text file for storing tabular data without installing database servers, perfect for minor projects. SQL databases are scalable for enterprise multi-user ERP systems.",
    detailedAnswer: "For an offline, portable minor project that needs to run effortlessly on any laptop during a viva without setting up MySQL or PostgreSQL credentials, CSV + Pandas is the most reliable and portable solution.",
    keyKeywords: ["Portability", "Zero Setup", "Offline Execution", "Lightweight Storage"],
    difficulty: "Easy"
  },
  {
    id: 30,
    category: "Viva Defense & Tips",
    question: "If an examiner asks you to modify a parameter live during viva, how will you demonstrate it?",
    shortAnswer: "Navigate to the 'Student Prediction' page on Streamlit, adjust the sliders (e.g. increase study hours or decrease attendance), and click 'Predict Performance' to show instant recalculation.",
    detailedAnswer: "Streamlit's reactive UI updates immediately upon form submission. I can demonstrate how moving attendance from 55% to 85% changes the prediction from 'Needs Improvement' (Fail risk) to 'Good' with updated counseling advice.",
    keyKeywords: ["Live Demo", "Slider Interaction", "Instant Recalculation", "Visual Proof"],
    difficulty: "Easy"
  },
  {
    id: 31,
    category: "Python & Libraries",
    question: "What command is used to run the application on a local machine?",
    shortAnswer: "'streamlit run app.py' in the terminal or command prompt inside the project folder.",
    detailedAnswer: "After installing dependencies with `pip install -r requirements.txt`, running `streamlit run app.py` starts a local web server (typically on port 8501) and automatically opens the browser.",
    keyKeywords: ["streamlit run app.py", "pip install -r requirements.txt", "Local Server", "Port 8501"],
    difficulty: "Easy"
  },
  {
    id: 32,
    category: "Model Evaluation",
    question: "Why is MAE preferred over MSE when explaining results to college administrators?",
    shortAnswer: "Because MAE is expressed directly in marks (e.g., ±2 marks error), whereas MSE is in squared marks (e.g., 4 marks²), which is unintuitive for non-technical stakeholders.",
    detailedAnswer: "Administrators understand: 'Our prediction is accurate to within 2 marks on average'. Telling them the error is '4.5 squared marks' requires mental conversion, making MAE the most practically communicative metric.",
    keyKeywords: ["Practical Communicability", "Direct Marks Unit", "Human Interpretable"],
    difficulty: "Medium"
  }
];
