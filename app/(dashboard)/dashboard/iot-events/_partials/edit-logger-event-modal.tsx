"use client";

import { useEffect } from "react";
import { Button, Group, Modal, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "core/i18n";
import { useUpdateLoggerEvent } from "core/actions/update-logger-event/update-logger-event.hook";
import { getLoggerEventsKey } from "core/actions/get-logger-events/get-logger-events.hook";
import type { LoggerEvent } from "core/entities";
import type { UpdateLoggerEventPayload } from "core/actions/update-logger-event/update-logger-event.types";

type SensorFields = Pick<
  UpdateLoggerEventPayload,
  | "key_ncy"
  | "key_ph"
  | "key_mtu"
  | "key_tur"
  | "key_cnd"
  | "key_tmp"
  | "key_ntu"
  | "key_vbat"
  | "key_nsat"
  | "key_rssi"
  | "sensor_data"
>;

interface EditLoggerEventModalProps {
  event: LoggerEvent;
  onClose: () => void;
}

export function EditLoggerEventModal({
  event,
  onClose,
}: EditLoggerEventModalProps) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const form = useForm<SensorFields>({
    initialValues: {
      key_ncy: event.efficiency ?? null,
      key_ph: event.ph ?? null,
      key_mtu: event.turbidityMtu ?? null,
      key_tur: event.turbidity ?? null,
      key_cnd: event.conductivity ?? null,
      key_tmp: event.temperature ?? null,
      key_ntu: event.turbidityNtu ?? null,
      key_vbat: event.batteryVoltage ?? null,
      key_nsat: event.satellites ?? null,
      key_rssi: event.signalStrength ?? null,
      sensor_data: event.sensorData ?? null,
    },
  });

  useEffect(() => {
    form.setValues({
      key_ncy: event.efficiency ?? null,
      key_ph: event.ph ?? null,
      key_mtu: event.turbidityMtu ?? null,
      key_tur: event.turbidity ?? null,
      key_cnd: event.conductivity ?? null,
      key_tmp: event.temperature ?? null,
      key_ntu: event.turbidityNtu ?? null,
      key_vbat: event.batteryVoltage ?? null,
      key_nsat: event.satellites ?? null,
      key_rssi: event.signalStrength ?? null,
      sensor_data: event.sensorData ?? null,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event.id]);

  const { mutate: updateEvent, isPending } = useUpdateLoggerEvent({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getLoggerEventsKey });
      notifications.show({
        message: t("iotEvents.updateSuccess"),
        color: "green",
      });
      onClose();
    },
    onError: () => {
      notifications.show({
        message: t("iotEvents.updateError"),
        color: "red",
      });
    },
  });

  const handleSubmit = (values: SensorFields) => {
    if (event.id == null || !event.keyTag || !event.deviceId) {
      return;
    }

    updateEvent({
      id: event.id,
      payload: {
        key_tag: event.keyTag,
        device_id: event.deviceId,
        ...values,
      },
    });
  };

  return (
    <Modal opened onClose={onClose} title={t("iotEvents.editTitle")} size="lg">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <NumberInput
          label={t("iotEvents.columns.ph")}
          mb="sm"
          decimalScale={2}
          {...form.getInputProps("key_ph")}
        />
        <NumberInput
          label={t("iotEvents.columns.tmp")}
          mb="sm"
          decimalScale={2}
          {...form.getInputProps("key_tmp")}
        />
        <NumberInput
          label={t("iotEvents.columns.cnd")}
          mb="sm"
          decimalScale={2}
          {...form.getInputProps("key_cnd")}
        />
        <NumberInput
          label={t("iotEvents.columns.ntu")}
          mb="sm"
          decimalScale={2}
          {...form.getInputProps("key_ntu")}
        />
        <NumberInput
          label={t("iotEvents.columns.vbat")}
          mb="sm"
          decimalScale={2}
          {...form.getInputProps("key_vbat")}
        />
        <NumberInput
          label={t("iotEvents.columns.rssi")}
          mb="sm"
          {...form.getInputProps("key_rssi")}
        />
        <Group justify="flex-end" mt="md">
          <Button variant="default" onClick={onClose}>
            {t("common.cancel")}
          </Button>
          <Button type="submit" loading={isPending}>
            {t("common.save")}
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
