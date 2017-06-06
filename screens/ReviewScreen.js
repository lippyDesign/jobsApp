import React, { Component } from 'react';
import { View, Text, Platform, ScrollView, Linking } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';

class ReviewScreen extends Component {
  // add property to the class for react navigation to use as configurations to cutomize the route
  static navigationOptions = ({ navigation }) => ({
    title: 'Review Jobs',
    tabBarIcon: ({ tintColor }) => <Icon name='favorite' size={30} color={tintColor} />,
    headerRight: <Button backgroundColor="rgba(0,0,0,0)" color="rgba(0, 122, 255, 1)" title="Settings" onPress={() => navigation.navigate('settings')} />,
    headerStyle: { marginTop: Platform.OS === 'android' ? 24 : 0 } // android needs a little more margin on top than iOS
  });
  renderLikedJobs() {
    return this.props.likedJobs.map(({ company, formattedRelativeTime, url, longitude, latitude, jobtitle, jobkey }) => {
      const initialRegion = { longitude, latitude, latitudeDelta: 0.045, longitudeDelta: 0.02 }
      return <Card key={jobkey} title={jobtitle}>
        <View style={styles.container}>
          <MapView
            style={styles.map}
            cacheEnabled={Platform.OS === 'android'}
            scrollEnabled={false}
            initialRegion={initialRegion}
          />
          <View style={styles.detailWrapper}>
            <Text style={styles.italics}>{company}</Text>
            <Text style={styles.italics}>{formattedRelativeTime}</Text>
          </View>
          <Button title='Apply Now' backgroundColor='#03A9F4' onPress={() => Linking.openURL(url)} />
        </View>
      </Card>
    });
  }
  render() {
    return <ScrollView>{this.renderLikedJobs()}</ScrollView>;
  }
}

const styles = {
  map: { flex: 1},
  container: { height: 200 },
  detailWrapper: { marginBottom: 10, marginTop: 10, flexDirection: 'row', justifyContent: 'space-around' },
  italics: { fontStyle: 'italic' }
}

const mapStateToProps = ({ likedJobs }) => ({ likedJobs });

export default connect(mapStateToProps)(ReviewScreen);