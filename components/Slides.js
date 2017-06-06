import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class extends Component {
  renderLastSlide(i) {
    if (i === this.props.data.length - 1) {
      return <Button onPress={this.props.onSlidesComplete} buttonStyle={styles.buttonStyle} title="I'm Ready" raised />
    }
  }

  renderSlides() {
    const { slideStyle, textStyle } = styles;
    return this.props.data.map(({ text, color }, i) => {
      return <View key={text} style={[slideStyle, {backgroundColor: color}]}>
        <Text style={textStyle}>{text}</Text>
        {this.renderLastSlide(i)}
      </View>
    });
  }

  render() {
    return <ScrollView pagingEnabled horizontal style={styles.containerStyle}>{this.renderSlides()}</ScrollView>;
  }
}

const styles = {
  containerStyle: { flex: 1 },
  slideStyle: { flex: 1, justifyContent: 'center', alignItems: 'center', width: SCREEN_WIDTH },
  textStyle: { fontSize: 30, color: 'white', textAlign: 'center', marginBottom: 15 },
  buttonStyle: { backgroundColor: '#0288D1' }
}
