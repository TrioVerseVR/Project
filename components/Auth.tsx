import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { supabase } from '@/lib/supabase';

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleAuth = async () => {
    setLoading(true);
    setEmailError('');
    setPasswordError('');
    
    if (!email) {
      setEmailError('Email is required.');
      setLoading(false);
      return;
    }

    if (!password) {
      setPasswordError('Password is required.');
      setLoading(false);
      return;
    }

    if (isSignUp) {
      // Check if the email already exists
      const { data, error } = await supabase
        .from('users') // Assuming 'users' is your table for users
        .select('email')
        .eq('email', email)
        .single();

      if (data) {
        setEmailError('Email is already in use.');
        setLoading(false);
        return;
      }

      // Proceed with signup
      const { error: signupError } = await supabase.auth.signUp({ email, password });
      if (signupError) {
        setEmailError(signupError.message); // Display error under the email input
      } else {
        setEmailError(''); // Clear any previous error
        alert('Success');
      }
    } else {
      // Proceed with login
      const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
      if (loginError) {
        setEmailError(loginError.message); // Display error under the email input
      } else {
        setEmailError(''); // Clear any previous error
        alert('Success');
      }
    }
    setLoading(false);
  };

  const handleForgotPassword = async () => {
    setLoading(true);
    setEmailError('');

    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      setEmailError(error.message); // Display error under the email input
    } else {
      setEmailError(''); // Clear any previous error
      alert('Success');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isSignUp ? 'Create Account' : 'Welcome Back!'}</Text>
      <Text style={styles.subtitle}>{isSignUp ? 'Sign up to get started' : 'Sign in to continue'}</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleAuth} disabled={loading}>
        <Text style={styles.buttonText}>{isSignUp ? 'Sign Up' : 'Login'}</Text>
      </TouchableOpacity>

      {!isSignUp && (
        <TouchableOpacity onPress={handleForgotPassword} disabled={loading}>
          <Text style={styles.link}>Forgot Password?</Text>
        </TouchableOpacity>
      )}

      <View style={styles.toggleContainer}>
        <Text style={styles.toggleText}>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
        </Text>
        <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
          <Text style={styles.toggleLink}>{isSignUp ? 'Sign In' : 'Sign Up'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  button: {
    height: 50,
    backgroundColor: '#007bff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    color: '#007bff',
    textAlign: 'center',
    marginVertical: 10,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  toggleText: {
    fontSize: 16,
    color: '#666',
  },
  toggleLink: {
    fontSize: 16,
    color: '#007bff',
    marginLeft: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'left',
  },
});
