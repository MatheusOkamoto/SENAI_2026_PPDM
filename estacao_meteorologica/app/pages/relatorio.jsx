import { View, Text, FlatList, StyleSheet } from 'react-native';

const medicoes = [
    { id: 1, temp: 30, hum: 50, vento: 20, mes: 'Jan' },
    { id: 2, temp: 32, hum: 50, vento: 15, mes: 'Fev' },
    { id: 3, temp: 24, hum: 70, vento: 5, mes: 'Mar' },
    { id: 4, temp: 37, hum: 10, vento: 2, mes: 'Abr' },
];

function ItemLista({ item }) {
    return (
        <View style={styles.card}>
            <Text style={styles.month}>Mês {item.mes}</Text>

            <View style={styles.row}>
                <Text style={styles.label}>Temperatura</Text>
                <Text style={styles.value}>{item.temp}ºC</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Umidade</Text>
                <Text style={styles.value}>{item.hum}%</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Vento</Text>
                <Text style={styles.value}>{item.vento} km/h</Text>
            </View>
        </View>
    );
}

export default function Relatorio() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Relatório de Medições Meteorológicas</Text>

            <FlatList
                data={medicoes}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => <ItemLista item={item} />}
                contentContainerStyle={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
        paddingHorizontal: 22,
        paddingTop: 36,
    },
    title: {
        color: '#111111',
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 22,
        textAlign: 'center',
    },
    list: {
        paddingBottom: 24,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E6E6E6',
        borderRadius: 16,
        padding: 18,
        marginBottom: 14,
    },
    month: {
        color: '#111111',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 14,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#EEEEEE',
        paddingVertical: 10,
    },
    label: {
        color: '#666666',
        fontSize: 14,
    },
    value: {
        color: '#111111',
        fontSize: 14,
        fontWeight: '600',
    },
});