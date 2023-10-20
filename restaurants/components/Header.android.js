import React from 'react';
import { Text, View, Image } from 'react-native';

import HeaderStyle from '../styles/HeaderStyle';
import CourseImage from '../images/course.png';

const Header = () => {
  return (
    <View style={HeaderStyle.android}>
      <Image source={CourseImage} style={HeaderStyle.image} />
      <Text style={HeaderStyle.text}>Courses</Text>
    </View>
  )
};

export default Header;
