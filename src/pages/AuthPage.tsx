import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/common/Layout';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

const AuthPage: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const isLogin = type === 'login';
  
  return (
    <Layout title={isLogin ? 'Login' : 'Register'} showBackButton>
      <div className="py-10">
        {isLogin ? <LoginForm /> : <RegisterForm />}
      </div>
    </Layout>
  );
};

export default AuthPage;