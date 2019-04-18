from flask import Flask, render_template, request,jsonify, redirect
from flask_mysqldb import MySQL
import pickle
import yaml
import numpy as np
app = Flask(__name__)

# Configure db
db = yaml.load(open('db.yaml'))
app.config['MYSQL_HOST'] = db['mysql_host']
app.config['MYSQL_USER'] = db['mysql_user']
app.config['MYSQL_PASSWORD'] = db['mysql_password']
app.config['MYSQL_DB'] = db['mysql_db']

mysql = MySQL(app)
# Load the saved model
loaded_model = pickle.load(open('Final_predictive_model/finalized_model.sav', 'rb'))

@app.route("/", methods=['GET', 'POST'])
def home():
    new=''
    if request.method == 'POST':
        # Fetch form data
        int_features = [int(x) for x in request.form.values()]
        final_features = [np.array(int_features)]
        prediction=loaded_model.predict(final_features)

        userDetails = request.form
        Age = userDetails['age']
        Number_of_dependents = userDetails['Dependents']
        Debt_Ratio = userDetails['debtratio']
        Monthly_Income = userDetails['monthlyincome']
        Revolving_Utilization_Of_Unsecured_Lines = userDetails['ruoul']

        NumberOfTime30_59DaysPastDueNotWorse = userDetails['30-59 days']
        NumberOfTime60_89DaysPastDueNotWorse = userDetails['60-89 days']
        NintyDays=userDetails['90days']
        NumberOfOpenCreditLinesAndLoans = userDetails['NumberOfOpenCreditLinesAndLoans']

        NumberRealEstateLoansOrLines = userDetails['NumberRealEstateLoansOrLines']


        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO data(Age, Nuumber_Of_Dependents,Debt_Ratio,Montly_Income,RUOUL,30_59Days,60_89Days,90_days,Number_of_open_Credit_lines_and_loans,Number_of_real_estate_loans_lines)VALUES(%s, %s,%s, %s,%s, %s,%s, %s,%s,%s)",(Age,Number_of_dependents,Debt_Ratio,Monthly_Income,Revolving_Utilization_Of_Unsecured_Lines,NumberOfTime30_59DaysPastDueNotWorse,NumberOfTime60_89DaysPastDueNotWorse,NintyDays,NumberOfOpenCreditLinesAndLoans,NumberRealEstateLoansOrLines))
        mysql.connection.commit()
        cur.close()
        # return 'Successfully'   
        print(prediction)
        if prediction==0:
            new='Your loan application is not selected'

        else:
            new='Your loan application is selected'
        
    return render_template("template.html",prediction_result=new)



@app.route('/visuals')
def visuals():
    return render_template('visuals.html') 



if __name__ == "__main__":
    app.run(debug=True)
