
import { StyleSheet } from 'react-native';

export const colors = {
    primary: '#9b59b6',
    background: '#fff',
    text: '#333',
    placeholder: '#999',
};

export const GlobalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        padding: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30
    },
    titleList: {
        fontSize: 22,
        marginBottom: 12,
        fontWeight: 'bold',
    },
    label: {
        fontSize: 16,
        marginTop: 12
    },
    labelPlace: {
        fontSize: 16,
        fontWeight: '400',
        color: '#929292',
        marginRight: 5,
    },
    text: {
        width: '90%',
        fontSize: 16,
        marginBottom: 4,
        color: '#333',
    },
    textBold: {
        fontWeight: 'bold',
        fontSize: 16
    },
    input: {
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        color: colors.text,
    },
    inputPlace: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 16,
        justifyContent: 'flex-start',
    },
    value: {
        fontSize: 16,
        color: '#333',
    },
    button: {
        backgroundColor: '#7D3C98',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold'
    },
    link: {
        color: '#7D3C98',
        textAlign: 'center',
        textDecorationLine: 'underline'
    },
    linkLsit: {
        color: '#7D3C98',
        textAlign: 'left',
        textDecorationLine: 'underline',
        paddingBottom: 8,
    },
    boldText: {
        fontWeight: 'bold',
        color: '#000',
    },
    card: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
        backgroundColor: '#f9f9f9',
    },
    cardAg: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 8,
        overflow: 'hidden',
    },
    deleteIcon: {
        position: 'absolute',
        right: 0,
        marginRight: 8,
        marginTop: 8
    },
    menuContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    titleHome: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 30,
    },
    buttonHome: {
        backgroundColor: '#7D3C98',
        width: 140,
        height: 140,
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonTextHome: {
        color: '#fff',
        marginTop: 8,
        fontSize: 16,
        textAlign: 'center',
    },
    pickerContainer: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginRight: 8,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible'
    },
    pickerContainerAg: {
        flex: 0,
        width: '100%',
        marginBottom: 15,
    },
    placeholder: {
        color: 'gray', // Custom color for the placeholder
    },
    dateButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        height: 55,
    },
    dateText: {
        marginLeft: 6
    },
    empty: {
        textAlign: 'center',
        color: '#666',
        marginTop: 20
    },
    lineTop: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#00CF56',
        padding: 8,
        borderRadius: 8
    },
    clearButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FF6B6B',
        padding: 8,
        borderRadius: 8,
        marginLeft: 8
    },
    TextButton: {
        color: '#fff',
        marginLeft: 6,
        fontWeight: 'bold'
    },
    timeMarker: {
        width: 60,
        backgroundColor: '#7D3C98',
        justifyContent: 'center',
        alignItems: 'center'
    },
    timeText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    info: {
        flex: 1,
        padding: 8
    },

});