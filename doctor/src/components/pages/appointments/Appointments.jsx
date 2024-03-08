/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import styled from "styled-components";

const AppointmentsContainer = ({ className }) => {
    const appointments = useSelector((state) => state.appointment.data);

    return (
        <div className={className}>
            <div className="title">Appointments</div>

            {!appointments.length ? (
                <div className="no-appts">Нету записей</div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th className="date">Дата отправки</th>
                            <th className="name">ФИО</th>
                            <th className="phone">Телефон</th>
                            <th className="problem">Проблема</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((item) => (
                            <tr key={item._id}>
                                <td>{item.createdAt.split("T")[0]}</td>
                                <td>{item.name}</td>
                                <td>{item.phone}</td>
                                <td>{item.problem}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export const Appointments = styled(AppointmentsContainer)`
    & .title {
        text-align: center;
        font-size: 40px;
        margin-top: 100px;
        font-family: "Dancing Script", sans-serif;
    }

    & .no-appts {
        text-align: center;
        font-size: 30px;
        color: gray;
        margin-top: 100px;
    }

    table {
        border-collapse: collapse;
        width: 1100px;
        margin: 0 auto;
        margin-top: 20px;
    }
    th,
    td {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
    }
    th {
        background-color: #f2f2f2;
    }

    & .date {
        width: 130px;
    }

    & .name {
        width: 200px;
    }

    & .phone {
        width: 150px;
    }
`;
