
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
    label: {
        fontSize: 16,
        marginTop: 12
    },
    input: {
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        color: colors.text, // cor do texto digitado
    },
    button: {
        backgroundColor: '#7D5FFF',
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
        color: '#7D5FFF',
        textAlign: 'center',
        textDecorationLine: 'underline'
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
    deleteIcon: {
        position: 'absolute',
        right: 0,
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
        flex: 1, borderWidth: 1, borderColor: '#ccc',
        borderRadius: 8, marginRight: 8,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible'
    },
    dateButton: {
        flexDirection: 'row', alignItems: 'center',
        borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
        paddingHorizontal: 12, paddingVertical: 8
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

});