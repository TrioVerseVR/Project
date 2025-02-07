import React, { useEffect, useState } from 'react';
import { View, TextInput, ScrollView, Image, StyleSheet, TouchableOpacity, Text, Dimensions, FlatList } from 'react-native';
import { supabase } from '@/lib/supabase';
import { Icon } from 'react-native-elements';

interface Place {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  rating: number;
  latitude: number;
  longitude: number;
  comments: string[];
}

const Card: React.FC<{ place: Place }> = ({ place }) => (
  <TouchableOpacity style={styles.card}>
    <Image source={{ uri: place.image }} style={styles.cardImage} />
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{place.title}</Text>
      <Text style={styles.cardDescription}>{place.description}</Text>
      <Text style={styles.cardRating}>Rating: {place.rating}/5</Text>
      <TouchableOpacity style={styles.cardButton}>
        <Text style={styles.cardButtonText}>View on Map</Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

const App = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = async () => {
    const { data, error } = await supabase.from('places').select('*');
    if (error) {
      console.error('Error fetching places:', error);
    } else {
      setPlaces(data || []);
    }
  };

  const filteredPlaces = places.filter((place) => {
    const matchesSearch = place.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'All' || place.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Icon name="search" size={24} color="#888" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Filter Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
        {['All', 'Popular', 'Top Rated', 'Recommended'].map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[styles.filterButton, selectedFilter === filter && styles.selectedFilterButton]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text style={[styles.filterButtonText, selectedFilter === filter && styles.selectedFilterButtonText]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Cards */}
      <FlatList
        data={filteredPlaces}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Card place={item} />}
        ListEmptyComponent={<Text style={styles.emptyText}>No places found.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
  },
  filtersContainer: {
    marginBottom: 20,
  },
  filterButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    marginRight: 10,
  },
  selectedFilterButton: {
    backgroundColor: '#007bff',
  },
  filterButtonText: {
    color: '#000',
  },
  selectedFilterButtonText: {
    color: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    marginBottom: 10,
  },
  cardRating: {
    fontSize: 12,
    color: '#555',
    marginBottom: 10,
  },
  cardButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
  },
  cardButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
});

export default App;