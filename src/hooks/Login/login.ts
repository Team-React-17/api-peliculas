import { useState } from 'react';

const LoginHook = (): any => {
  const [error, setError] = useState({ email: false, password: false });
  const [msg, setMsg] = useState('');
  const [isLoggin, setIsLoggin] = useState(false);
  return { error, setError, msg, setMsg, isLoggin, setIsLoggin };
};

export default LoginHook;
