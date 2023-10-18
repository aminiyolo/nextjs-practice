import '@styles/globals.css';

export const metadata = {
  title: 'nextjs-practice',
  description: 'do practice',
};

const RootLayout = ({ children }) => {
  return (
    <html lang='ko'>
      <body>
        <div className='main'>
          <div className='gradient' />
        </div>
        <main className='app'>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
