import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Button,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { searchAirports } from '../../services/api';
// import { Airport } from '../types';

const HomeScreen: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (query.length < 3) return;
    setLoading(true);
    try {
      const data = await searchAirports(query);
      console.log('daaat', data);

      setResults(data);
    } catch (error) {
      console.error('Search failed:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.title}>Search Airports</Text>

        {/* Row layout for input + button */}
        <View style={styles.searchRow}>
          <TextInput
            style={styles.input}
            value={query}
            onChangeText={setQuery}
            placeholder="Enter airport/city"
          />
          <Button title="Search" onPress={handleSearch} />
          <Button
            title="Clear"
            onPress={() => {
              setResults([]);
              setQuery('')
            }}
          />
        </View>

        {loading && (
          <ActivityIndicator size="large" style={{ marginTop: 20 }} />
        )}
        <FlatList
          data={results}
          keyExtractor={item => item.navigation.entityId}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>
                {item.presentation.suggestionTitle}
              </Text>
              <Text>{item.presentation.subtitle}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container2: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
    width: '100%',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
  },
  card: {
    padding: 14,
    backgroundColor: '#f1f1f1',
    marginBottom: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'black',
  },
  name: {
    fontWeight: 'bold',
  },
});
