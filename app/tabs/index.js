import React from 'react';
import Explorer from './explorer';
import ProfileTab from './profile';

export default function Tabs({ activeTab }) {
  if (activeTab === 'home') {
    return <Explorer />;
  }
  return <ProfileTab />;
}
