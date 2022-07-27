from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.select import Select
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.alert import Alert
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.support import expected_conditions as EC
import time

driver = webdriver.Chrome()
driver.implicitly_wait(10)
driver.get('http://127.0.0.1:5500/frontEnd/index.html');



# time.sleep(1)
driver.maximize_window()
registerBtn = driver.find_element(By.LINK_TEXT, "Register")
registerBtn.click()

# registration page
registerBtn = driver.find_element(By.ID, "register-submit-btn")
registerBtn.click()
time.sleep(1)
alertObj = Alert(driver)
alertObj.accept()


idInput = driver.find_element(By.ID, "employee-id-input")
idInput.send_keys("abc")
registerBtn = driver.find_element(By.ID, "register-submit-btn")
registerBtn.click()
time.sleep(1)
alertObj2 = Alert(driver)
alertObj2.accept()

driver.find_element(By.ID, "employee-id-input").clear()
idInput = driver.find_element(By.ID, "employee-id-input")
idInput.send_keys("1")
registerBtn = driver.find_element(By.ID, "register-submit-btn")
registerBtn.click()
time.sleep(1)
alertObj2 = Alert(driver)
alertObj2.accept()


driver.find_element(By.ID, "employee-id-input").clear()
idInput = driver.find_element(By.ID, "employee-id-input")
idInput.send_keys("123456")
driver.find_element(By.ID, "username-input").clear()

usernameInput = driver.find_element(By.ID, "username-input")
usernameInput.send_keys("Ch")
registerBtn = driver.find_element(By.ID, "register-submit-btn")
registerBtn.click()
time.sleep(1)
alertObj2 = Alert(driver)
alertObj2.accept()

driver.find_element(By.ID, "employee-id-input").clear()
idInput = driver.find_element(By.ID, "employee-id-input")
idInput.send_keys("123456")
driver.find_element(By.ID, "username-input").clear()

usernameInput = driver.find_element(By.ID, "username-input")
usernameInput.send_keys("Christo")
driver.find_element(By.ID, "password-input").clear()

passwordInput = driver.find_element(By.ID, "password-input")
passwordInput.send_keys("123ab")

registerBtn = driver.find_element(By.ID, "register-submit-btn")
registerBtn.click()
time.sleep(1)
alertObj2 = Alert(driver)
alertObj2.accept()


driver.find_element(By.ID, "employee-id-input").clear()
idInput = driver.find_element(By.ID, "employee-id-input")
idInput.send_keys("123456")
driver.find_element(By.ID, "username-input").clear()

usernameInput = driver.find_element(By.ID, "username-input")
usernameInput.send_keys("Christo")
driver.find_element(By.ID, "password-input").clear()

passwordInput = driver.find_element(By.ID, "password-input")
passwordInput.send_keys("PassWord123!")
driver.find_element(By.ID, "firstname-input").clear()

registerBtn = driver.find_element(By.ID, "register-submit-btn")
firstnameInput = driver.find_element(By.ID, "firstname-input")
firstnameInput.send_keys("Chris")
driver.find_element(By.ID, "lastname-input").clear()

lastnameInput = driver.find_element(By.ID, "lastname-input")
lastnameInput.send_keys("Sullivan")
registerBtn.click()

emailInput = driver.find_element(By.ID, "email-input")
emailInput.send_keys("email@rev")
registerBtn.click()



#
#
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
registerBtn = driver.find_element(By.LINK_TEXT, "Register")
registerBtn.click()
loginBtn = driver.find_element(By.LINK_TEXT, "Login")
loginBtn.click()

# login page
# time.sleep(1)
# loginBtn = driver.find_element(By.LINK_TEXT, "Login")
# loginBtn.click()
# time.sleep(1)
# alertObj = Alert(driver)# # emailInput = driver.find_element(By.ID, "email-input")
# # # emailInput.send_keys("email@rev")
# # # registerBtn.click()
# # # time.sleep(2)
# # # alertObj2 = Alert(driver)
# # # time.sleep(1)
# # #
# alertObj.accept()

usernameInput = driver.find_element(By.ID, "username-login-input")
usernameInput.send_keys("ChristopSullivan")
passwordInput = driver.find_element(By.ID, "password-login-input")
passwordInput.send_keys("PassWord123!")



#employee side login
# driver.implicitly_wait(5)
# dropdown = driver.find_element(By.ID, "status")
# select_element = Select(dropdown)
# time.sleep(2)
#
# select_element.select_by_index(1)
# #
# dropdown = Select(select_element)
# dropdown.select_by_visible_text("Travel")




driver.quit()