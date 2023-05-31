import React, { FC } from 'react'
import { Button } from 'native-base'

type CustomButtonProps = {
  title: string
  onPress: () => void
  isLoading?: boolean
  variant?: string
}

const CustomButton: FC<CustomButtonProps> = ({
  title,
  onPress,
  isLoading = false,
  variant = 'solid',
}) => {
  return (
    <Button
      isLoading={isLoading}
      variant={variant}
      isLoadingText="Loading"
      colorScheme="lime"
      borderRadius={10}
      width={200}
      shadow={4}
      onPress={onPress}>
      {title}
    </Button>
  )
}

export default CustomButton
