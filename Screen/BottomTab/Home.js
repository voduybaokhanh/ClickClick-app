import { StyleSheet, Text, View, TextInput , Button} from 'react-native'
import React from 'react'


const Home = (navigation) => {
  const SearchScreen = () => {
    const [searchText, setSearchText] = useState('');
  return (
    <View>
     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        style={{ borderWidth: 1, borderColor: 'gray', padding: 10, width: 200 }}
        placeholder="Nhập từ khóa tìm kiếm"
        value={searchText}
        onChangeText={text => setSearchText(text)}
      />
      <Button title="Tìm kiếm" onPress={handleSearch} />
    </View>
    </View>
  )
}}

export default Home

const styles = StyleSheet.create({})