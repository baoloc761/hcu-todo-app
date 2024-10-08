## Cài Đặt Yêu Cầu:
- Node.js >= 14.x
- Yarn >= 1.x
- Cài gói thư viện api axios Moc data và thư viện MUI: 
	* yarn add axios axios-mock-adapter @mui/material @emotion/react @emotion/styled
	* yarn add axios-mock-adapter
- Cài đặt gói thư viện toast alert: yarn add react-toastify để show thông báo khi checked box
- Cài đặt gói thư viện jest và testing cho api: 
  + Sử dụng jest và @testing-library/react-hooks cùng với axios-mock-adapter để mock các yêu cầu API: 
   * yarn add @testing-library/react-hooks axios-mock-adapter jest
  + Sử dụng jest để testing: 
   * yarn add jest @types/jest ts-jest @testing-library/react @testing-library/jest-dom @testing-library/react-hooks --dev
- yarn build
- yarn start: chạy dự án
## Để chạy UNitTest:
- cd tới folder src và cd UnitTests. Chạy lệnh yarn test để test case
