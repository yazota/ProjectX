from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time


class TwitterBot:
    def __init__(self,username,password):
        self.username = username
        self.password = password
        self.bot = webdriver.Firefox()

    def login(self):
     bot = self.bot
     bot.get('https://twitter.com/login')
     time.sleep(1)
     email = bot.find_element_by_name('session[username_or_email]')
     password = bot.find_element_by_name('session[password]')
     email.clear()
     password.clear()
     email.send_keys(self.username)
     password.send_keys(self.password)
     password.send_keys(Keys.RETURN)
     time.sleep(1)

    def like_tweet(self,hashtag):
        bot = self.bot
        bot.get('https://twitter.com/search?q=' + hashtag + '&src=typed_query')
        time.sleep(2)
        for i in range(1,3):
          bot.execute_script('window.scrollTo(0,document.body.scrollHeight)')
          time.sleep(2)
          tweetLinks = [i.get_attribute('href') for i in bot.find_elements_by_xpath("//a[@dir='auto']")] # Looking for all the element where they have an attribute dir=auto - not the best way but I was in a hurry, lol
          filteredLinks = list(filter(lambda x: 'status' in x,tweetLinks))
          for tweetLink in tweetLinks:
             bot.get('https://twitter.com' + tweetLink)
             try:
                 bot.f('like').click()
                 time.sleep(3)  
             except Exception as ex:
                 time.sleep(3)

  
sau = TwitterBot('botalbot@yahoo.com', '098765Bb')
sau.login()
sau.like_tweet('love saudi')
