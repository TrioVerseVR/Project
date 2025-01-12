import { StyleSheet, ScrollView, Image} from 'react-native';
import 'react-native-url-polyfill/auto';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Auth from '@/components/Auth';
import { View } from 'react-native';
import { Session } from '@supabase/supabase-js';
import { ThemedText } from '@/components/ThemedText';

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const cards = [
    {
      title: 'Card 1',
      description: 'description',
      image: 'https://via.placeholder.com/100',
    },
    {
      title: 'Card 2',
      description: 'description',
      image: 'https://via.placeholder.com/100',
    },
  ];

  return (
    <View style={styles.container}>
      {!session ? (
        <Auth />
      ) : (
        <ScrollView>
          {cards.map((card, index) => (
            <View key={index} style={styles.card}>
              <Image source={{ uri: card.image }} style={styles.cardImage} />
              <View style={styles.cardContent}>
                <ThemedText style={styles.cardTitle}>{card.title}</ThemedText>
                <ThemedText style={styles.cardDescription}>{card.description}</ThemedText>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginVertical: 8,
  },
});