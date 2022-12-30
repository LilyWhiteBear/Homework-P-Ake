# Open file
Use 2 terminal to run both backend and frontend.

#### For frontend use command
```
cd homework
npm start
```

#### For backend use command
```
cd backend
npm start
```

# List of function

### Log In
Access website by using
```
ID: admin
Password: 1234
```

### Calendar
Click the first button in home list to access calendar.<br /><br />
กดที่ปุ่มแรกในลิสต์หน้า home เพื่อเข้าสู่หน้าปฏิทิน<br /><br />
Code in folder 
```
homework/src/app/main/calendar/
```
- All function in ts file (except SelectDate) will convert B.E. into A.D. by take innerHtml of relative class and add 543 to its text.<br /><br />
ฟังก์ชันในไฟล์ ts ทั้งหมดยกเว้น SelectDate() จะเปลี่ยนปี พศ เป็น คศ ด้วยการนำ innerHtml ของคลาสที่เกี่ยวข้องมาเพิ่ม 543 ปี<br /><br />
- Change language of calendar setting in file<br /><br />
  ตั้งค่าการเปลี่ยนภาษาในไฟล์<br /><br />
  ```
  appInitializerFactory() in homework/src/app/app.module.ts
  ```
  and
  และ<br /><br />
  ```
  translate() in homework/src/app/app.component.ts
  ```
  Translated text contained in file<br /><br />
  ภาษาที่ถูกแปลจะบรรจุอยู่ในไฟล์<br /><br />
  ```
  homework/src/assets/i18n/th.json
  ```
  
### Table
Click the second button in home list to access table.<br /><br />
กดที่ปุ่มที่สองในลิสต์หน้า home เพื่อเข้าสู่หน้าตาราง<br /><br />
Code in folder
```
homework/src/app/main/table/
```
- CreateAutoTable() will add font using base64 font converted from .ttf file.<br /><br />
  CreateAutoTable() จะทำการเพิ่มฟ้อนด้วยการใช้ base64 ที่ถูกแปลงจากไฟล์ .ttf <br /><br />
  ```
  this.doc.addFileToVFS("THSarabunNew.ttf", font);
  this.doc.addFont("THSarabunNew.ttf", "THSarabunNew", "normal");
  this.doc.setFont("THSarabunNew", "normal");
  ```
- font contained in file<br /><br />
  ฟ้อนต์ถูกบรรจุอยู่ในไฟล์<br /><br />
  ```
  homework/src/assets/font/font.ts
  ```
   
### ValidateForm
Click the thrid button in home list to access validate form.<br /><br />
กดที่ปุ่มที่สามในลิสต์หน้า home เพื่อเข้าสู่หน้าฟอร์ม<br /><br />
Code in folder
```
homework/src/app/main/validate-form/
```
- Each inputs using directive file in folder
  แต่ละช่องกรอกข้อมูลจะใช้งาน directive ในโฟลเดอร์<br /><br />
  ```
  homework/src/app/main/directive
  ```

### OmisePayment
Click the forth button in home list to access Omise payment.<br /><br />
กดที่ปุ่มที่สี่ในลิสต์หน้า home เพื่อเข้าสู่หน้าชำระเงินด้วย Omise<br /><br />
Code in folder
```
homework/src/app/main/payment
```
- Open Omise Form in functions<br /><br />
  เปิดฟอร์มการชำระเงินในฟังก์ชัน<br /><br />
  ```
  OpenOmiseCardForm()
  OpenOmiseIBForm()
  ```
 - Then, when user finish filling form, followng functions will send request and subscribe response.<br /><br />
   จากนั้น เมื่อผู้ใช้กรอกข้อมูลเสร็จ ฟังก์ชันเหล่านี้จะทำการยิงคำขอและรอรับการตอบกลับ<br /><br />
   ```
   OnCreateTokenCardSuccess()
   OnCreateTokenIBSuccess()
   ```
 - Backend will work in file<br /><br />
   Backend จะทำงานในไฟล์<br /><br />
   ```
   backend/server.js
   ```
  
### ol-Map
Access map in buttom of home page.<br /><br />
เข้าถึงแผนที่ได้ในด้านล่างของหน้าแรก<br /><br />
Code in folder
```
homework/src/app/main/link-page
```
- Map have been created by function<br /><br />
  แผนที่ถูกสร้างโดยฟังก์ชัน<br /><br />
  ```
  InitMap()
  ```
- Search location in input using fuction<br /><br />
  ค้นหาตำแหน่งด้วยการกรอกช่องข้อมูล ใช้ฟังก์ชัน<br /><br />
  ```
  SearchLocation()
  ```
- Mark a location in map using function<br /><br />
  มาร์คตำแหน่งในแผนที่ด้วยฟังก์ชัน<br /><br />
  ```
  SelectLocation()
  ```
