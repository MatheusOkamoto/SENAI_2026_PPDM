import { View, Text, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

const dadosLinha = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [{ data: [65, 66, 68, 77, 50, 40] }]
};

const dadosPizza = [
    { name: 'Jd Paulista', temp: 18, color: '#111111', legendFontColor: '#444444', legendFontSize: 12 },
    { name: 'Portal dos Nobres', temp: 20, color: '#444444', legendFontColor: '#444444', legendFontSize: 12 },
    { name: 'Três Pontes', temp: 15, color: '#777777', legendFontColor: '#444444', legendFontSize: 12 },
    { name: 'Jd Alto da Boa Vista', temp: 15, color: '#BBBBBB', legendFontColor: '#444444', legendFontSize: 12 },
];

const chartConfig = {
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(80, 80, 80, ${opacity})`,
    strokeWidth: 2,
    propsForDots: {
        r: '3',
        strokeWidth: '1',
        stroke: '#000000',
        fill: '#FFFFFF',
    },
    propsForBackgroundLines: {
        stroke: '#E5E5E5',
    },
};

export default function Dashboard() {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.inner}>

            <Text style={styles.title}>Estação Meteorológica Sesi</Text>
            <Text style={styles.subtitle}>Monitoramento Ambiental</Text>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Últimas Medições</Text>

                <View style={styles.divider}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>Temperatura</Text>
                    <View style={styles.dividerLine} />
                </View>

                <View style={styles.row}>
                    <View style={styles.measureItem}>
                        <Text style={styles.label}>12/06/2026</Text>
                        <Text style={styles.measureValue}>25ºC</Text>
                    </View>

                    <View style={styles.measureItem}>
                        <Text style={styles.label}>11/06/2026</Text>
                        <Text style={styles.measureValue}>22ºC</Text>
                    </View>
                </View>

                <View style={styles.divider}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>Umidade</Text>
                    <View style={styles.dividerLine} />
                </View>

                <View style={styles.row}>
                    <View style={styles.measureItem}>
                        <Text style={styles.label}>12/06/2026</Text>
                        <Text style={styles.measureValue}>60%</Text>
                    </View>

                    <View style={styles.measureItem}>
                        <Text style={styles.label}>11/06/2026</Text>
                        <Text style={styles.measureValue}>80%</Text>
                    </View>
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Acompanhe em Tempo Real</Text>

                <Text style={styles.label}>Temperatura mensal ºC</Text>

                <LineChart
                    data={dadosLinha}
                    width={width - 88}
                    height={200}
                    chartConfig={chartConfig}
                    bezier
                    style={styles.chart}
                />

                <View style={styles.divider}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>por bairro</Text>
                    <View style={styles.dividerLine} />
                </View>

                <Text style={styles.label}>Bairros de Mirandópolis</Text>

                <PieChart
                    data={dadosPizza}
                    width={width - 88}
                    height={200}
                    chartConfig={chartConfig}
                    accessor="temp"
                    backgroundColor="transparent"
                    paddingLeft="0"
                    style={styles.chart}
                />
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },
    inner: {
        alignItems: 'center',
        paddingHorizontal: 22,
        paddingVertical: 36,
    },
    title: {
        color: '#111111',
        fontSize: 25,
        fontWeight: '600',
        marginBottom: 4,
        textAlign: 'center',
    },
    subtitle: {
        color: '#666666',
        fontSize: 14,
        marginBottom: 28,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#E6E6E6',
        padding: 22,
        width: '100%',
        marginBottom: 18,
    },
    sectionTitle: {
        color: '#111111',
        fontSize: 17,
        fontWeight: '600',
        marginBottom: 18,
    },
    label: {
        color: '#666666',
        fontSize: 11,
        letterSpacing: 1,
        marginBottom: 8,
        textTransform: 'uppercase',
    },
    row: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 6,
    },
    measureItem: {
        flex: 1,
        backgroundColor: '#FAFAFA',
        borderWidth: 1,
        borderColor: '#EEEEEE',
        borderRadius: 14,
        paddingHorizontal: 14,
        paddingVertical: 13,
    },
    measureValue: {
        color: '#111111',
        fontSize: 22,
        fontWeight: '600',
    },
    chart: {
        borderRadius: 14,
        marginBottom: 10,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 18,
        gap: 10,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E8E8E8',
    },
    dividerText: {
        color: '#777777',
        fontSize: 12,
        textTransform: 'lowercase',
    },
});