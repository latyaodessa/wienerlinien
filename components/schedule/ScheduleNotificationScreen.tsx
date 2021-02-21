import * as React from "react";
import {
    DaysOfWeek,
    getScheduler,
    getWLTickets,
    storeScheduler,
    TicketScheduler,
    TimeType,
    WLTicket
} from "../../utils/WLAsyncStorage";
import {Picker, ScrollView, TouchableOpacity, View} from "react-native";
import {DrawerScreenProps} from "@react-navigation/drawer";
import {
    ActivityIndicator,
    Button,
    Chip,
    Headline,
    Modal,
    Paragraph,
    Portal,
    Subheading,
    Surface,
    TextInput,
    Title,
    useTheme
} from "react-native-paper";
import {useIsFocused} from "@react-navigation/native";
import {TimePickerModal} from 'react-native-paper-dates'
import {isTicketValid} from "../tickets/TicketsListScreen";
import moment from "moment";
import 'intl';
import 'intl/locale-data/jsonp/en';
import * as Notifications from "expo-notifications"; // or any other locale you need
import {AlertContext} from "../../context/AlertContext";

const ScheduleNotificationScreen: React.FC<DrawerScreenProps> = ({route, navigation}) => {
    const isFocused = useIsFocused();

    const {colors} = useTheme();
    const [tickets, setTickets] = React.useState<Array<WLTicket> | undefined>(undefined);
    const {dispatchAlert} = React.useContext(AlertContext);
    const [scheduler, setScheduler] = React.useState<TicketScheduler | undefined>(undefined);

    const saveScheduler = (sc?: TicketScheduler) => {
        storeScheduler(sc);
    }

    const addOrDeleteDay = (dayEnum: DaysOfWeek, isDelete: boolean) => {
        let daysOfTheWeek = scheduler?.days ? scheduler.days : [];

        if (isDelete) {
            daysOfTheWeek = daysOfTheWeek.filter(f => f !== dayEnum);
        } else {
            daysOfTheWeek = [...daysOfTheWeek, ...[dayEnum]];
        }

        if (scheduler) {
            let sc: TicketScheduler = {...scheduler, days: daysOfTheWeek};
            setScheduler(sc);
            saveScheduler(sc);
        }

    }

    const setTime = (time: TimeType) => {

        if (scheduler) {
            let sc: TicketScheduler = {...scheduler, time: time};

            setScheduler(sc);
            saveScheduler(sc);
        }
    }

    const setDismiss = (dismiss: number) => {
        if (scheduler) {
            let sc: TicketScheduler = {...scheduler, dismiss: dismiss};
            setScheduler(sc);
            saveScheduler(sc);
        }
    }

    const setTicket = (ticketId: string) => {
        if (scheduler) {
            const t = tickets?.find(t => t.id === ticketId);
            let sc: TicketScheduler = {...scheduler, wlTicket: t};
            setScheduler(sc);
            saveScheduler(sc);
        }
    }

    React.useEffect(() => {
        getWLTickets().then((tks) => {
            setTickets(tks)
        });

        getScheduler().then((s) => {
            setScheduler(s);
        })
    }, [isFocused])

    const resetAll = () => {
        Notifications.cancelAllScheduledNotificationsAsync();
        setScheduler(undefined);
        saveScheduler();
        dispatchAlert && dispatchAlert({
            type: 'open',
            alertType: 'info',
            message: "Notification scheduler cancelled"
        });
    }

    const save = React.useCallback(() => {
        Notifications.cancelAllScheduledNotificationsAsync();

        console.log(scheduler?.time?.hours);
        console.log(scheduler?.time?.minutes);

        if (scheduler && scheduler.time) {
            Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Hello i am scheduled notification ❤️',
                },
                trigger: {
                    hour: scheduler?.time?.hours,
                    minute: scheduler?.time?.minutes
                },
            });

            dispatchAlert && dispatchAlert({
                type: 'open',
                alertType: 'success',
                message: "Notification scheduler is set up"
            });
        } else {
            dispatchAlert && dispatchAlert({
                type: 'open',
                alertType: 'error',
                message: "Time and valid ticket are mandatory"
            });
        }
    }, [scheduler])

    if (!tickets) {
        return <ActivityIndicator/>;
    }

    return (<ScrollView style={{flex: 1}}>

        <Surface

            style={{
                backgroundColor: "#E30013",
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 10,
                margin: 0,
                borderWidth: 0,
                elevation: 5
            }}>

            <Title>Schedule ticket push notification</Title>

        </Surface>

        <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignContent: "center",
            alignItems: "center"
        }}>
            <View style={{width: 200, padding: 10}}>

                <Subheading>Days of the week</Subheading>
                {Object.keys(DaysOfWeek).map(d => {
                    return <ChipDay dayEnum={DaysOfWeek[d]} selected={scheduler?.days ? scheduler.days : []}
                                    addOrDeleteDay={addOrDeleteDay}/>
                })}
            </View>

            {/*<AppWithProviders />*/}
            <TimePickerPage setTime={setTime} time={scheduler?.time} dismiss={scheduler?.dismiss}
                            setDismiss={setDismiss}/>
        </View>
        <View style={{padding: 10}}>
            <Subheading>Select valid ticket</Subheading>
            {tickets.filter(t => isTicketValid(t)).length === 0 ?
                <TextInput disabled={true} error={true} value={"You do not have any active ticket to schedule"}/>
                : <View style={{flex: 1, width: "100%"}}>
                    <Picker
                        style={{
                            // width: 200,
                            height: 60,
                            backgroundColor: colors.background,
                            borderColor: 'grey',
                            borderWidth: 1,
                            color: colors.text
                        }}
                        itemStyle={{
                            height: 60,
                            color: colors.text
                        }}
                        selectedValue={scheduler?.wlTicket?.id}
                        onValueChange={setTicket}
                    >

                        {tickets.filter(t => isTicketValid(t)).map(t => {
                            return (<Picker.Item key={t.id}
                                                 label={`${t.ticket.title} (${moment(t.validTo).format('YYYY-MM-DD HH:MM')})`}
                                                 value={t.id}/>)
                        })}


                    </Picker>
                </View>}
        </View>

        <Button mode="contained" onPress={save}>Save</Button>
        <Button onPress={resetAll}>Reset Scheduled Notification</Button>

    </ScrollView>)
}

const ChipDay: React.FC<{ dayEnum: DaysOfWeek, selected: Array<DaysOfWeek>, addOrDeleteDay: (d: DaysOfWeek, v: boolean) => void }> = ({
                                                                                                                                          dayEnum,
                                                                                                                                          selected,
                                                                                                                                          addOrDeleteDay,

                                                                                                                                      }) => {
    const {colors} = useTheme();
    const isSelected = !!selected.find(s => s === dayEnum);
    return (<Chip style={{margin: 2, backgroundColor: isSelected ? colors.primary : "rgb(56, 56, 56)"}}
                  selected={isSelected}
                  onPress={() => addOrDeleteDay(dayEnum, isSelected)}>{dayEnum}</Chip>)
}

const TimePickerPage: React.FC<{ setTime: (t: TimeType) => void, time?: TimeType, dismiss?: number, setDismiss: (v: number) => void }> = ({
                                                                                                                                              setTime,
                                                                                                                                              time,
                                                                                                                                              dismiss,
                                                                                                                                              setDismiss
                                                                                                                                          }) => {
    const [visible, setVisible] = React.useState(false)
    const {colors} = useTheme();

    const onDismiss = React.useCallback(() => {
        setVisible(false)
    }, [setVisible])

    const onConfirm = React.useCallback(
        ({hours, minutes}) => {
            setVisible(false);
            setTime({hours, minutes});
        },
        [setVisible]
    );


    return (
        <View style={{flex: 1, paddingTop: 10}}>
            <Subheading>Scheduled time</Subheading>
            <View style={{padding: 10, justifyContent: "center", alignItems: "center", flex: 1}}>
                {time && <TouchableOpacity onPress={() => setVisible(true)}>
                    <Surface style={{
                        alignItems: "center",
                        backgroundColor: "#E30013",
                        elevation: 6,
                        padding: 10,
                        borderRadius: 15,
                        margin: 5
                    }}>
                        <Headline>{readableString(time.hours)}:{readableString(time.minutes)}</Headline>
                    </Surface>
                </TouchableOpacity>}
                <Portal>

                    <Modal visible={visible} onDismiss={() => setVisible(false)}
                           contentContainerStyle={{flex: 1, left: "50%"}}>
                        <TimePickerModal
                            visible={visible}
                            onDismiss={onDismiss}
                            onConfirm={onConfirm}
                            // hours={24} // default: current hours
                            // minutes={14} // default: current minutes
                            label="Select notification time" // optional, default 'Select time'
                            cancelLabel="Cancel" // optional, default: 'Cancel'
                            confirmLabel="Ok" // optional, default: 'Ok'
                            animationType="fade" // optional, default is 'none'
                            // locale={'en'} // optional, default is automically detected by your system
                        />
                    </Modal>
                </Portal>


                {!time && <Button onPress={() => setVisible(true)} mode="contained">
                    Pick time
                </Button>}

                <View style={{flex: 1, width: "100%", padding: 10}}>
                    <Paragraph>Dismiss in:</Paragraph>
                    <Picker
                        style={{
                            // width: 200,
                            height: 60,
                            backgroundColor: colors.background,
                            borderColor: 'grey',
                            borderWidth: 1,
                            color: colors.text
                        }}
                        itemStyle={{
                            height: 60,
                            color: colors.text
                        }}
                        selectedValue={dismiss}
                        onValueChange={(itemValue) => setDismiss(itemValue)}
                    >
                        <Picker.Item label={"15 minutes"} value={15}/>
                        <Picker.Item label={"30 minutes"} value={30}/>
                        <Picker.Item label={"1 hour"} value={60}/>
                        <Picker.Item label={"2 hours"} value={120}/>
                        <Picker.Item label={"Manually"} value={0}/>

                    </Picker>
                </View>

            </View>
        </View>
    )
}

function readableString(num: number) {
    if ((num + "").length === 1) {
        return "0" + num;
    }
    return num;
}


export default ScheduleNotificationScreen;
