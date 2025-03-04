import React from 'react';
import { Flex } from "@sparrowengg/twigs-react";
import { SparrowIQ } from '..';

export default {
  component: SparrowIQ,
  title: "Main Configuration/SparrowIQ",
  args: {},
  argTypes: {},
};

const Template = () => {
  const iq = new SparrowIQ({
    FileType: ['pdf', 'docx', 'doc'],
    config: {
      API_KEY: 'AIzaSyDbX8XifmUsG-uUmgRdQTWmwxulKPKuniI',
      UPLOAD_URL: 'https://generativelanguage.googleapis.com/upload/v1beta/files',
      GENERATE_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent'
    }
  });
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      css={{
        width: "100%",
        height: "95vh",
      }}
    >
        <div
            style={{
              cursor: "pointer",
              width: "100px",
              height: "100px",
              backgroundColor: "#A7FC00",
              borderRadius: "50%",
            }}
          ></div>
    </Flex>
  );
};
export const Default = Template.bind({});
