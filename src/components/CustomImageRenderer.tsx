import { useWindowDimensions, Modal, Button, Text, View } from "react-native";
import React, { useState } from "react";
import RenderHtml, { useInternalRenderer } from "react-native-render-html";

export default function CustomImageRenderer(props: any) {
  const { Renderer, rendererProps } = useInternalRenderer("img", props);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onPress = () => setIsModalOpen(true);
  const onModalClose = () => setIsModalOpen(false);
  const uri = rendererProps.source.uri;
  const thumbnailSource = {
    ...rendererProps.source,
    // You could change the uri here, for example to provide a thumbnail.
    uri: uri?.replace("1200", "300").replace("800", "200"),
  };
  return (
    <View style={{ alignItems: "center" }}>
      <Renderer {...rendererProps} source={thumbnailSource} onPress={onPress} />
      <Modal visible={isModalOpen} onRequestClose={onModalClose}>
        <Renderer {...rendererProps} />
        <Text>A full resolution image!</Text>
        <Button title="Close Modal" onPress={onModalClose} />
      </Modal>
    </View>
  );
}
