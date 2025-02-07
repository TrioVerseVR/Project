import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Alert,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '@/lib/supabase';

export default function DetailScreen() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [user, setUser] = useState<{ username: string; email: string } | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    // Fetch user information on component mount
    const fetchUser = async () => {
      const { data: userData, error } = await supabase.auth.getUser();
      if (error) {
        Alert.alert('Error', 'Failed to fetch user information');
      } else if (userData) {
        setUser({
          username: userData.user?.user_metadata.username || 'Guest',
          email: userData.user?.email || 'N/A',
        });
        setProfileImage(userData.user?.user_metadata.profileImage || null);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (profileImage) {
      const fetchUser = async () => {
        const { data: userData, error } = await supabase.auth.getUser();
        if (error) {
          Alert.alert('Error', 'Failed to fetch user information');
        } else if (userData) {
          setUser({
            username: userData.user?.user_metadata.username || 'Guest',
            email: userData.user?.email || 'N/A',
          });
          setProfileImage(userData.user?.user_metadata.profileImage || null);
        }
      };
      fetchUser();
    }
  }, [profileImage]);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Logged Out', 'You have successfully logged out.');
      // Optionally navigate to the login screen or home page
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Denied',
        'We need permission to access your photos to upload a profile picture.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setProfileImage(uri);

      // Upload the image to a storage service (Supabase Storage)
      const response = await fetch(uri);
      const blob = await response.blob();
      
      const { data, error } = await supabase.storage
        .from('profile-pics') // Make sure to create a storage bucket
        .upload(`${Date.now()}.png`, blob);
      
      if (error) {
        Alert.alert('Error', 'Failed to upload image');
      } else {
        // Save the image URL in the user's profile metadata
        const { data: publicUrlData } = supabase.storage
          .from('profile-pics')
          .getPublicUrl(data.path);
      
        // Update user metadata
        const { error: updateUserError } = await supabase.auth.updateUser({
          data: { profileImage: publicUrlData.publicUrl },
        });
      
        if (updateUserError) {
          Alert.alert('Error', 'Failed to update user profile');
        } else {
          Alert.alert('Success', 'Profile picture updated');
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile Settings</Text>

      {/* Profile Picture */}
      <TouchableOpacity onPress={pickImage} style={styles.profileImageContainer}>
        <Image
          source={
            profileImage
              ? { uri: profileImage }
              : require('@/assets/images/default-profile.png') // Fallback profile picture
          }
          style={styles.profileImage}
        />
        <Text style={styles.changePhotoText}>Change Photo</Text>
      </TouchableOpacity>

      {/* User Information */}
      <Text style={styles.infoText}>Username: {user?.username}</Text>
      <Text style={styles.infoText}>Email: {user?.email}</Text>

      {/* Example Setting: Notifications */}
      <View style={styles.settingContainer}>
        <Text style={styles.settingText}>Enable Notifications</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      {/* Change Password */}
      <TouchableOpacity
        style={styles.settingContainer}
        onPress={() => console.log('Change Password')}
      >
        <Text style={styles.settingText}>Change Password</Text>
      </TouchableOpacity>

      {/* Privacy Settings */}
      <TouchableOpacity
        style={styles.settingContainer}
        onPress={() => console.log('Privacy Settings')}
      >
        <Text style={styles.settingText}>Privacy Settings</Text>
      </TouchableOpacity>

      {/* Delete Account */}
      <TouchableOpacity
        style={styles.settingContainer}
        onPress={() =>
          Alert.alert(
            'Delete Account',
            'Are you sure you want to delete your account?',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Delete', onPress: () => console.log('Account Deleted') },
            ]
          )
        }
      >
        <Text style={[styles.settingText, { color: 'red' }]}>Delete Account</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  changePhotoText: {
    fontSize: 16,
    color: '#007bff',
  },
  infoText: {
    fontSize: 18,
    marginBottom: 10,
  },
  settingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  settingText: {
    fontSize: 18,
  },
  logoutButton: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#ff4d4d',
    alignItems: 'center',
    borderRadius: 5,
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
