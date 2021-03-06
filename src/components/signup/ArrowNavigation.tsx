import React from 'react';
import { StyleSheet } from 'react-native';
import ArrowButton, { Direction } from '../ArrowButton';

interface Props {
    onBack: () => void;
    onNext: () => void;
}

/**
 * A set of forward and backward arrow buttons
 * @param onBack - Function to be called on pressing the left arrow
 * @param onNext - Function to be called on pressing the right arrow
 */
const ArrowNavigation: React.FC<Props> = ({ onBack, onNext }) => {
    return (
        <>
            <ArrowButton
                text="back"
                color="#62bdd0"
                onPress={onBack}
                direction={Direction.Left}
            />
            <ArrowButton
                text="next"
                color="#94d361"
                onPress={onNext}
                direction={Direction.Right}
            />
        </>
    );
};

const styles = StyleSheet.create({});

export default ArrowNavigation;
