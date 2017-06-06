import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { Card, Button, Icon } from 'react-native-elements';
import Swipe from '../components/Swipe'
import * as actions from '../actions';

class DeckScreen extends Component {
  static navigationOptions = {
    title: 'Jobs',
    tabBarIcon: ({ tintColor }) => <Icon name='description' size={30} color={tintColor} />
  }
  renderCard(job) {
    const { jobtitle, company, formattedRelativeTime, snippet, longitude, latitude } = job;
    const initialRegion = { longitude, latitude, latitudeDelta: 0.045, longitudeDelta: 0.02 };
    return <Card title={jobtitle} titleStyle={{ height: 20 }}>
      <View style={{ height: 300 }}>
        <MapView initialRegion={initialRegion} scrollEnabled={false} style={{ flex: 1 }} cacheEnabled={Platform.OS === 'android'}>
        </MapView>
      </View>
      <View style={styles.detailWrapper}>
        <Text>{company}</Text>
        <Text>{formattedRelativeTime}</Text>
      </View>
      <Text style={styles.jobDescriptionStyle}>{snippet.replace(/<b>/g, '').replace(/<\/b>/g, '')}</Text>
    </Card>
  }
  renderNoMoreCards = () => {
    return <Card title='No More Jobs'>
      <Button title='Back To Map' large icon={{ name: 'my-location'}} backgroundColor='#03A9F4' onPress={() => this.props.navigation.navigate('map')} />
    </Card>;
  }
  render() {
    return <View style={{ marginTop: 10 }}>
      <Swipe onSwipeRight={job => this.props.likeJob(job)} data={this.props.jobs} renderCard={this.renderCard} renderNoMoreCards={this.renderNoMoreCards} keyProp='jobkey' />
    </View>;
  }
}

const styles = {
  detailWrapper: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },
  jobDescriptionStyle: { height: 75}
};

const mapStateToProps = state => ({ jobs: state.jobs.results });

export default connect(mapStateToProps, actions)(DeckScreen);