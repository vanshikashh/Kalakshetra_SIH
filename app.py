from flask import Flask, render_template, request, jsonify
import json

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/map')
def map_page():
    return render_template('map.html')

@app.route('/shop')
def shop_page():
    return render_template('shop.html')

@app.route('/facts')
def facts_page():
    return render_template('facts.html')

@app.route('/calendar')
def calendar_page():
    return render_template('calendar.html')

@app.route('/aboutus')
def aboutus_page():
    return render_template('aboutus.html')

@app.route('/contact')
def contact_page():
    return render_template('contact.html')

@app.route('/states/jammunkashmir')
def jammu():
    return render_template('states/jnk.html')
@app.route('/states/madhyapradesh')
def madhya():
    return render_template('states/mp.html')
@app.route('/states/assam')
def assam():
    return render_template('states/assam.html')
@app.route('/states/maharashtra')
def maharashtra():
    return render_template('states/maha.html')
@app.route('/states/andamannicobar')
def andaman():
    return render_template('states/and.html')
@app.route('/states/wb')
def wb():
    return render_template('states/wb.html')
@app.route('/states/rajasthan')
def rajasthan():
    return render_template('states/raja.html')
@app.route('/states/punjab')
def punjab():
    return render_template('states/punj.html')
@app.route('/states/tamil_nadu')
def tamil():
    return render_template('states/tn.html')
@app.route('/states/andhrapradesh')
def andhra():
    return render_template('states/andh.html')
@app.route('/states/arunachalpradesh')
def arunachal():
    return render_template('states/arun.html')
@app.route('/states/bihar')
def bihar():
    return render_template('states/bihar.html')
@app.route('/states/chhattisgarh')
def chhattisgarh():
    return render_template('states/chhat.html')
@app.route('/states/delhi')
def delhi():
    return render_template('states/delhi.html')
@app.route('/states/goa')
def goa():
    return render_template('states/goa.html')
@app.route('/states/gujarat')
def gujarat():
    return render_template('states/guj.html')
@app.route('/states/haryana')
def haryana():
    return render_template('states/hary.html')
@app.route('/states/himachalpradesh')
def himachal():
    return render_template('states/him.html')
@app.route('/states/jharkhand')
def jharkhand():
    return render_template('states/jharkhand.html')
@app.route('/states/karnataka')
def karnataka():
    return render_template('states/karn.html')
@app.route('/states/kerela')
def kerala():
    return render_template('states/kerela.html')
@app.route('/states/ladakh')
def ladakh():
    return render_template('states/ladakh.html')
@app.route('/states/lakshadweep')
def lakshadweep():
    return render_template('states/laksh.html')

@app.route('/states/manipur')
def manipur():
    return render_template('states/manipur.html')
@app.route('/states/meghalaya')
def meghalaya():
    return render_template('states/megh.html')
@app.route('/states/mizoram')
def mizoram():
    return render_template('states/mizo.html')
@app.route('/states/nagaland')
def nagaland():
    return render_template('states/naga.html')
@app.route('/states/odisha')
def odisha():
    return render_template('states/odisha.html')
@app.route('/states/sikkim')
def sikkim():
    return render_template('states/sikkim.html')
@app.route('/states/telangana')
def telangana():
    return render_template('states/tela.html')
@app.route('/states/tripura')
def tripura():
    return render_template('states/tripura.html')
@app.route('/states/uk')
def uk():
    return render_template('states/uk.html')
@app.route('/states/up')
def up():
    return render_template('states/up.html')


def load_json(file_path):
    try:
        with open(file_path, 'r') as file:
            return json.load(file)
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
        return {}
    except FileNotFoundError:
        print("The file was not found.")
        return {}
    except Exception as e:
        print(f"An error occurred: {e}")
        return {}

data = load_json("C:\\Users\\ivans\\OneDrive\\Desktop\\PROJECTS\\Map\\bot\\intents.json")

@app.route('/get_recommendation', methods=['POST'])
def get_recommendation():
    destination = request.form.get('destination')
    days = request.form.get('days')

    days = int(days)
    days_key = f"{days}_days"

    if destination in data['destination'] and days_key in data['destination'][destination]:
        itinerary = data['destination'][destination][days_key]
        travel_sites = data.get('travel_sites', [])
        tips = data.get('tips', [])
    else:
        itinerary = "No recommendations available for the selected destination and number of days."
        travel_sites = []
        tips = []

    farewell = "Have a great day! If you need more help, just ask."

    return jsonify({
        'itinerary': itinerary,
        'travel_sites': travel_sites,
        'tips': tips,
        'farewell': farewell
    })

if __name__ == '__main__':
    app.run(debug=True)
