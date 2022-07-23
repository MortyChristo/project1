from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.select import Select

from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.alert import Alert
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.firefox.firefox_profile import FirefoxProfile
from selenium.webdriver.support import expected_conditions as EC
import time

driver = webdriver.Chrome()
driver.implicitly_wait(3)
driver.get('http://127.0.0.1:5500/frontEnd/index.html');
WebDriverWait(driver, 3).until(EC.visibility_of_element_located())


# time.sleep(1)
driver.maximize_window()
# time.sleep(2)
registerBtn = driver.find_element(By.LINK_TEXT, "Register")
registerBtn.click()
# time.sleep(2)

# registration page
# registerBtn = driver.find_element(By.ID, "register-submit-btn")
# registerBtn.click()
# time.sleep(1)
# alertObj = Alert(driver)
# alertObj.accept()
# time.sleep(1)

#
# idInput = driver.find_element(By.ID, "employee-id-input")
# idInput.send_keys("abc")
# registerBtn = driver.find_element(By.ID, "register-submit-btn")
# registerBtn.click()
# time.sleep(2)
# alertObj2 = Alert(driver)
# alertObj2.accept()
# time.sleep(1)
#
# idInput = driver.find_element(By.ID, "employee-id-input")
# idInput.send_keys("1")
# registerBtn = driver.find_element(By.ID, "register-submit-btn")
# registerBtn.click()
# time.sleep(2)
# alertObj2 = Alert(driver)
# alertObj2.accept()
# time.sleep(1)
#
# #
# #
# # #add case for double user
# #
# #
# #
#
#
# idInput = driver.find_element(By.ID, "employee-id-input")
# idInput.send_keys("123456")
# usernameInput = driver.find_element(By.ID, "username-input")
# usernameInput.send_keys("Ch")
# registerBtn = driver.find_element(By.ID, "register-submit-btn")
# registerBtn.click()
# time.sleep(2)
# alertObj2 = Alert(driver)
# alertObj2.accept()
# time.sleep(1)
#
# idInput = driver.find_element(By.ID, "employee-id-input")
# idInput.send_keys("123456")
# usernameInput = driver.find_element(By.ID, "username-input")
# usernameInput.send_keys("Christo")
# passwordInput = driver.find_element(By.ID, "password-input")
# passwordInput.send_keys("123ab")
# registerBtn = driver.find_element(By.ID, "register-submit-btn")
# registerBtn.click()
# time.sleep(2)
# alertObj2 = Alert(driver)
# alertObj2.accept()
# time.sleep(1)
#
# idInput = driver.find_element(By.ID, "employee-id-input")
# idInput.send_keys("123456")
# usernameInput = driver.find_element(By.ID, "username-input")
# usernameInput.send_keys("Christo")
# passwordInput = driver.find_element(By.ID, "password-input")
# passwordInput.send_keys("PassWord123!")
# registerBtn = driver.find_element(By.ID, "register-submit-btn")
# firstnameInput = driver.find_element(By.ID, "firstname-input")
# firstnameInput.send_keys("Chris")
# lastnameInput = driver.find_element(By.ID, "lastname-input")
# lastnameInput.send_keys("Sullivan")
# registerBtn.click()
# time.sleep(2)
# alertObj2 = Alert(driver)
# alertObj2.accept()
# time.sleep(1)
# #
# ##Alert driver not popping up
# # idInput = driver.find_element(By.ID, "employee-id-input")
# # idInput.send_keys("123456")
# # usernameInput = driver.find_element(By.ID, "username-input")
# # usernameInput.send_keys("Christo")
# # passwordInput = driver.find_element(By.ID, "password-input")
# # passwordInput.send_keys("PassWord123!")
# # registerBtn = driver.find_element(By.ID, "register-submit-btn")
# # firstnameInput = driver.find_element(By.ID, "firstname-input")
# # firstnameInput.send_keys("Chris")
# # lastnameInput = driver.find_element(By.ID, "lastname-input")
# # lastnameInput.send_keys("Sullivan")
# # emailInput = driver.find_element(By.ID, "email-input")
# # emailInput.send_keys("email@rev")
# # registerBtn.click()
# # time.sleep(2)
# # alertObj2 = Alert(driver)
# # time.sleep(1)
# #

homeBtn = driver.find_element(By.LINK_TEXT, "Home")
homeBtn.click()
# time.sleep(2)
registerBtn = driver.find_element(By.LINK_TEXT, "Register")
registerBtn.click()
# time.sleep(2)
loginBtn = driver.find_element(By.LINK_TEXT, "Login")
loginBtn.click()
time.sleep(1)

# login page
# loginBtn = driver.find_element(By.LINK_TEXT, "Login")
# loginBtn.click()
# alertObj = Alert(driver)
# alertObj.accept()

usernameInput = driver.find_element(By.ID, "username-login-input")
usernameInput.send_keys("ChristopSullivan")
passwordInput = driver.find_element(By.ID, "password-login-input")
passwordInput.send_keys("PassWord123!")
loginBtn = driver.find_element(By.LINK_TEXT, "Login")
loginBtn.click()

#employee side login
driver.implicitly_wait(5)
dropdown = driver.find_element(By.ID, "status")
select_element = Select(dropdown)
time.sleep(2)

select_element.select_by_index(1)
#
# dropdown = Select(select_element)
# dropdown.select_by_visible_text("Travel")




time.sleep(2)
driver.quit()