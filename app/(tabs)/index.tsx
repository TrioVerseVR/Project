import React, { useState } from 'react';
import { View, TextInput, ScrollView, Image, StyleSheet, TouchableOpacity, Text, FlatList, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';

interface CardProps {
  card: { title: string; description: string; image: string };
}

const Card: React.FC<CardProps> = ({ card }) => (
  <TouchableOpacity style={styles.card}>
    <Image source={{ uri: card.image }} style={styles.cardImage} />
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{card.title}</Text>
      <Text style={styles.cardDescription}>{card.description}</Text>
      <TouchableOpacity style={styles.cardButton}>
        <Text style={styles.cardButtonText}>Learn More</Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const filters = ['All', 'Popular', 'Top Rated', 'Recommended', 'Budget', 'Luxury'];

  const cards = [
    { title: 'Transportation', description: 'Find the best ways to get around.', image: 'https://via.placeholder.com/300', category: 'Popular' },
    { title: 'Restaurants', description: 'Top places to eat and dine.', image: 'https://via.placeholder.com/300', category: 'Top Rated' },
    { title: 'Hotels', description: 'Comfortable places to stay.', image: 'https://via.placeholder.com/300', category: 'Recommended' },
    { title: 'Hiking', description: 'Explore scenic trails.', image: 'https://via.placeholder.com/300', category: 'Popular' },
    { title: 'Shopping', description: 'Best spots for shopping.', image: 'https://via.placeholder.com/300', category: 'Top Rated' },
    { title: 'Events', description: 'Don’t miss out on local events.', image: 'https://via.placeholder.com/300', category: 'Luxury' },
  ];

  // Filter cards based on the selected filter and search query
  const filteredCards = cards.filter((card) => {
    const matchesSearch = card.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'All' || card.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const windowHeight = Dimensions.get('window').height;

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
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersContainer}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[styles.filterButton, selectedFilter === filter && styles.filterButtonSelected]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text
              style={[styles.filterText, selectedFilter === filter && styles.filterTextSelected]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Cards Container with Fixed Height */}
      <View style={[styles.cardsContainer, { height: windowHeight * 0.6 }]}>
        <FlatList
          data={filteredCards}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Card card={item} />}
          ListEmptyComponent={<Text style={styles.emptyText}>No items found.</Text>}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 45,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 50,
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },
  filtersContainer: {
    height: 60,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  filterButton: {
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButtonSelected: {
    backgroundColor: '#007bff',
  },
  filterText: {
    fontSize: 14,
    color: '#000',
  },
  filterTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cardsContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: 200,
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  cardButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  cardButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#999',
  },
});

export default App;
