import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { ConfigProvider } from 'antd';
import zhTW from 'antd/locale/zh_TW';

function App() {
  return (
    <ConfigProvider locale={zhTW} theme={{ token: { colorPrimary: '#1677ff' } }}>
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
