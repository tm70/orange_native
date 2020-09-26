import React from 'react';
import {StyleSheet} from 'react-native';
import ArrowButton, {Direction} from '../ArrowButton';

interface Props {
    onBack: () => void;
    onNext: () => void;
}

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
