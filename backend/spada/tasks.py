from apscheduler.schedulers.background import BackgroundScheduler
from spada.utils import fetch_weather_data

scheduler = BackgroundScheduler()

@scheduler.scheduled_job('interval', minutes=10)
def scheduled_fetch():
    fetch_weather_data()

scheduler.start()
