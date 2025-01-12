import React, { useState } from 'react';
import { View, TextInput, ScrollView, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import Collapsible from 'react-native-collapsible';
import { useNavigation } from '@react-navigation/native';

export default function DetailedScreen() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const navigation = useNavigation();
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prevFilters =>
      prevFilters.includes(filter)
        ? prevFilters.filter(f => f !== filter)
        : [...prevFilters, filter]
    );
  };

  const cards = [
    { title: 'Activites', description: 'Description for Activities.', image: 'https://via.placeholder.com/100' },
    { title: 'Resturants', description: 'Description for Restaurants.', image: 'https://via.placeholder.com/100' },
    { title: 'Events', description: 'Description for Events.', image: 'https://via.placeholder.com/100' },
    { title: 'Hotels', description: 'Description for Hotels.', image: 'https://via.placeholder.com/100' },
    { title: 'Shopping', description: 'Description for Shopping.', image: 'https://via.placeholder.com/100' },
    { title: 'Services', description: 'Description for Services.', image: 'https://via.placeholder.com/100' },
    { title: 'Transportation', description: 'Description for Transportation.', image: 'https://via.placeholder.com/100' },
    { title: 'Health', description: 'Description for Health.', image: 'https://via.placeholder.com/100' },
    { title: 'Education', description: 'Description for Education.', image: 'https://via.placeholder.com/100' },
    { title: 'Finance', description: 'Description for Finance.', image: 'https://via.placeholder.com/100' },
    { title: 'Hiking', description: 'Description for Hiking.', image: 'https://via.placeholder.com/100' }
  ];

  const filters = ['Activites', 'Resturants', 'Events', 'Hotels', 'Shopping', 'Services', 'Transportation', 'Health', 'Education', 'Finance', 'Hiking'];

  return (
    <ScrollView style={styles.container}>
      <ScrollView horizontal style={styles.imageSlider}>
        <Image source={{ uri: 'https://via.placeholder.com/300' }} style={styles.sliderImage} />
        <Image source={{ uri: 'https://via.placeholder.com/300' }} style={styles.sliderImage} />
        <Image source={{ uri: 'https://via.placeholder.com/300' }} style={styles.sliderImage} />
      </ScrollView>
      <View style={styles.filterSearchContainer}>
        <TextInput style={styles.searchBar} placeholder="Search..." />
        <TouchableOpacity onPress={toggleCollapse} style={styles.filterButton}>
          <Icon name="filter-list" size={30} />
        </TouchableOpacity>
      </View>
      <Collapsible collapsed={isCollapsed}>
        <View style={styles.filterOptions}>
          {filters.map((filter, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.filterOptionButton,
                selectedFilters.includes(filter) ? styles.activeFilter : null
              ]}
              onPress={() => toggleFilter(filter)}
            >
              <Text style={styles.filterOptionText}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Collapsible>
      <View style={styles.cardsContainer}>
        {cards
          .filter(card =>
            selectedFilters.length === 0 ||
            selectedFilters.some(filter => card.title.toLowerCase().includes(filter.toLowerCase()))
          )
          .map((card, index) => (
            <TouchableOpacity key={index} style={styles.card} onPress={() => toggleCard(index)}>
              <Image source={{ uri: card.image }} style={styles.cardImage} />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{card.title}</Text>
                <Collapsible collapsed={expandedCard !== index}>
                  <Text style={styles.cardDescription}>{card.description}</Text>
                  <Button
                    title="Learn More"
                    buttonStyle={styles.cardButton}
                    // onPress={() => navigation.navigate('DetailScreen', { card })}
                  />
                </Collapsible>
              </View>
            </TouchableOpacity>
          ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageSlider: {
    flexDirection: 'row',
    marginVertical: 16,
  },
  sliderImage: {
    width: 300,
    height: 200,
    marginHorizontal: 8,
  },
  filterSearchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  filterButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterOptions: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  filterOptionButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    margin: 5,
    flexBasis: '30%',
    alignItems: 'center',
  },
  activeFilter: {
    backgroundColor: '#007bff',
    color: '#fff',
  },
  filterOptionText: {
    fontSize: 16,
  },
  cardsContainer: {
    paddingHorizontal: 16,
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
  cardButton: {
    backgroundColor: '#007bff',
  },
});
